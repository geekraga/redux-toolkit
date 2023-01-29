import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles';

export default function PageBase({ title, navigation, noWrapContent, children, minHeight }) {
    const content = (
      <div style={{ minHeight, height: '100%', position: 'relative' }}>
        { children }
      </div>
    );

    return (
      <div>
        <span style={globalStyles.navigation}>{navigation}</span>
        { noWrapContent ? (
          <div>
            { content }
          </div>
        ) : (
          <Paper style={globalStyles.paper} zDepth={1}>
            {title && (
              <div>
                <h3 style={globalStyles.title}>{title}</h3>
                <Divider />
              </div>
            )}

            { content }
            <div style={globalStyles.clear} />
          </Paper>
        )}
      </div>
    );
}

PageBase.propTypes = {
    title: PropTypes.node,
    navigation: PropTypes.node,
    noWrapContent: PropTypes.bool,
    children: PropTypes.node,
    minHeight: PropTypes.number,
};

PageBase.defaultProps = {
    title: '',
    navigation: {},
    noWrapContent: false,
    children: {},
    minHeight: 500,
};
