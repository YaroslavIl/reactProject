import React from 'react';
import styles from "./CloseButton.module.css";

const CloseButton = (props) => {
  return (
    <div onClick={props.onClick} className={styles.closeButton}>
      <span className={styles.upItem}></span>
      <span className={styles.downItem}></span>
    </div>
  );
};

export default CloseButton;