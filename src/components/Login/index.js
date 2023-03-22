import React from 'react';
import CloseButton from '../CloseButton';
import styles from './Login.module.css'
import { useState, useEffect } from "react";

const Login = ({onClick}) => {
    return (
      <div className={styles.fonLogin}>
        <div className={styles.blockLogin}>
          <div className={styles.closeLogin}>
            <h2 className={styles.titleLogin}>Login</h2>
            <CloseButton onClick={onClick} />
          </div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className={styles.btnLogin}>Login</button>
          <p className={styles.textLogin}>
            dont have an account?
            <a className={styles.linkLogin} href="">
              Register
            </a>
          </p>
        </div>
      </div>
    );
};

export default Login;