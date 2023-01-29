import React, { Component, PropTypes } from 'react';

export default class SafeImage extends Component {

    constructor(props) {
        super(props);
        this.state = { imageUrl: props.imageUrl };
    }

    handleImageErrored = () => {
        this.setState({ imageUrl: require('../../public/defaultuserimage.jpeg') });
    }

    render() {
        const { componentClass, componentStyle } = this.props;
        return (
          <img
            src={this.state.imageUrl}
            className={componentClass}
            style={componentStyle}
            onError={this.handleImageErrored}
          />
        );
    }
}

SafeImage.propTypes = {
    imageUrl: PropTypes.string,
    componentClass: PropTypes.string,
    componentStyle: PropTypes.object,
};

SafeImage.defaultProps = {
    imageUrl: '',
    componentClass: '',
    componentStyle: {},
};
