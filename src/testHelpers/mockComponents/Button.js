import React, { PropTypes } from 'react';
import c from 'classnames';

export const mockButtonClassName = 'mockButton';

// a simple Button component because we don't want all the Material UI guff
export default function MockButton(props) {
    function onClick(event) {
        event.preventDefault();
        if (!props.disabled) props.onClick();
    }
    return (
        <a className={ c(mockButtonClassName, props.className) } href='' onClick={ onClick }>
            { props.children }
        </a>
    );
}

MockButton.defaultProps = {
    onClick: null,
    disabled: false,
    className: null,
    children: null,
};

MockButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};
