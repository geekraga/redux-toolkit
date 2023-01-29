import React, { PropTypes } from 'react';

export const mockDialogCloseClassName = 'mockDialogClose';

// a simple Dialog component because we don't want all the Material UI guff
export default function MockDialog(props) {
    return (
        <div>
            <button className={ mockDialogCloseClassName } onClick={ props.onClose } />
            { props.title }
            { props.children }
            { props.actions }
        </div>
    );
}

MockDialog.defaultProps = {
    title: null,
    children: null,
    actions: null,
    onClose: null,
};

MockDialog.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    actions: PropTypes.node,
    onClose: PropTypes.func,
};
