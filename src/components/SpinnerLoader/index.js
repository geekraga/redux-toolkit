import React from 'react';
import styles from './styles.scss';

export default function Spinner() {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}>
          <div className={styles.doubleBounce1} />
          <div className={styles.doubleBounce2} />
        </div>
      </div>
    );
}
