import React from "react";
import CloseButton from "../CloseButton";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";

const Register = ({ onClick }) => {
  return (
    <div className={styles.fonLogin}>
      <div className={styles.blockLogin}>
        <div className={styles.closeLogin}>
          <h2 className={styles.titleLogin}>Register</h2>
          <CloseButton onClick={onClick} />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button className={styles.btnLogin}>Register</button>
        <p className={styles.textLogin}>
          dont have an account?
          <a className={styles.linkLogin} href="">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
