import React from 'react';
import styles from './Footer.module.css';
import { useState } from 'react';

const Footer = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    return (
      <div className={styles.footer}>
        <div style={{ color: "cornsilk" }}>
          {`${currentDate.getDate()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getFullYear()}`}
        </div>
      </div>
    );
};

export default Footer;