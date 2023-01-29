import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default function LinkItem({ children, to, linkClass }) {
    return (
      <Link
        className={linkClass}
        to={to}
      >
        { children }
      </Link>
    );
}

LinkItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    linkClass: PropTypes.string,
};

LinkItem.defaultProps = {
    linkClass: '',
};
