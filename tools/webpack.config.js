/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

require('dotenv').config();

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const GLOBALS = {
    __DEV__: DEBUG,
    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
    output: {
        publicPath: '/assets/',
        sourcePrefix: '  ',
    },

    cache: DEBUG,

    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE,
    },

    plugins: [
        new ExtractTextPlugin((DEBUG ? '[name].css' : '[name].[chunkhash].css')),
    ],

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../src'),
                ],
                use: 'babel-loader',
            }, {
                test: /\.css$/,
                exclude: [
                    /\/components\//,
                    /\/containers\//,
                    /flexboxgrid/,
                    /sanitize.css/,
                    /image-gallery.css/,
                    /(ignoreHash.css)$/,
                ],
                loader: ExtractTextPlugin.extract([{
                    loader: 'css-loader',
                    // NOTE: ExtractTextPlugin needs 'query' instead of 'options'
                    query: {
                        sourceMap: true,
                        modules: true,
                        camelCase: true,
                        localIdentName: '[local]___[hash:base64:8]',
                        minimize: true,
                    },
                }]),
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: [
                    /flexboxgrid/,
                    /sanitize.css/,
                    /image-gallery.css/,
                    /(ignoreHash.css)$/,
                ],
            },
            {
                test: /\.scss$/,
                exclude: /flexboxgrid/,
                loader: ExtractTextPlugin.extract([{
                    loader: 'css-loader',
                    // NOTE: ExtractTextPlugin needs 'query' instead of 'options'
                    query: {
                        sourceMap: true,
                        modules: true,
                        camelCase: true,
                        localIdentName: '[local]___[hash:base64:8]',
                        minimize: true,
                    },
                },
                {
                    loader: 'resolve-url-loader',
                    query: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    query: {
                        sourceMap: true,
                        outputStyle: 'expanded',
                    },
                }]),
            }, {
                test: /\.json$/,
                use: 'json-loader',
            }, {
                test: /\.txt$/,
                use: 'raw-loader',
            }, {
                test: /\.(otf|png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'file-loader',
            },
        ],
    },
};


const clientConfig = extend(true,
    {}, config, {
        entry: {
            index: path.join(__dirname, '../src/index.js'),
            vendor: [
                'react',
                'react-dom',
            ],
        },
        output: {
            path: path.join(__dirname, '../build/public/assets/'),
            filename: DEBUG ? '[name].js' : '[name].[chunkhash].js',
        },
        node: {
            fs: 'empty',
        },
        // Choose a developer tool to enhance debugging
        // http://webpack.github.io/docs/configuration.html#devtool
        devtool: DEBUG ? 'cheap-source-map' : false,
        devServer: {
            historyApiFallback: {
                rewrites: [{
                    from: /\/(\d\.)?app\.js(\.map)?/,
                    to: context => context.match[0],
                }],
            },
        },
        plugins: [
            ...config.plugins,
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                ...GLOBALS,
                __CLIENT__: true,
                __SERVER__: false,
                'process.env.BROWSER': true,
            }),
            ...(!DEBUG ? [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        screw_ie8: true,
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                        warnings: VERBOSE,
                    },
                }),
                new webpack.optimize.AggressiveMergingPlugin(),
            ] : []),
            new AssetsPlugin({
                path: path.join(__dirname, '../build'),
                filename: 'assets.js',
                processOutput: x => `module.exports = ${JSON.stringify(x)};`,
            }),
        ],
    },
);

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
    entry: './src/server.js',
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    externals: [
        /^\.\/assets$/,
        function filter(context, request, cb) {
            const isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i);
            cb(null, Boolean(isExternal));
        },
    ],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    devtool: 'source-map',
    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            ...GLOBALS,
            __CLIENT__: false,
            __SERVER__: true,
            'process.env.BROWSER': false,
        }),
        new webpack.NormalModuleReplacementPlugin(/\.(scss|css|eot|ttf|woff|woff2)$/, 'node-noop'),
        new webpack.BannerPlugin({
            banner: `require('dotenv').config(); require('source-map-support').install();`,
            raw: true,
            entryOnly: false,
        }),
    ],
});

export default [clientConfig, serverConfig];
