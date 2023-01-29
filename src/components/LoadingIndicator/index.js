import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import c from 'classnames';
import styles from './styles.scss';

export default function LoadingIndicator({ loaderClasses }) {
    const { container, background } = loaderClasses;
    return (
      <div className={c(styles.container, container)}>
        <div className={styles.indicator}>
          <CircularProgress />
        </div>
        <div className={c(styles.background, background)} />
      </div>
    );
}

LoadingIndicator.propTypes = {
    loaderClasses: PropTypes.object,
};


LoadingIndicator.defaultProps = {
    loaderClasses: {},
};
