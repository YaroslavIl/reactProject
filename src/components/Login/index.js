import React from 'react';
import CloseButton from '../CloseButton';
import styles from './Login.module.css'
import { useState } from "react";
import { signInUser } from '../../firebaseTEsT';
import { startSession } from '../../session';
import { Link } from "react-router-dom";


const Login = ({ onClick, showReg, showLog }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(true);
  

  const emailValue = (e) => {
    setEmail(e.target.value);
  };
  const passwordlValue = (e) => {
    setPassword(e.target.value);
  };

  // вхід в систему
  const onSubmit = async (event) => {
    event.preventDefault();

    // валідація input
    if (!email || !password) {
      setError("Please enter your username and password.");
      setShowError(true);
      return;
    }

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      showLog(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
    console.log("Logging in...");
  };

  return (
    <div className={styles.fonLogin}>
      <div className={styles.blockLogin}>
        <div className={styles.closeLogin}>
          <h2 className={styles.titleLogin}>Login</h2>
          <CloseButton onClick={onClick} />
        </div>
        <form onSubmit={onSubmit}>
          <input
            value={email}
            onChange={(e) => emailValue(e)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => passwordlValue(e)}
            type="password"
            placeholder="Password"
          />
          {showError && <div style={{ color: "red" }}>{error}</div>}
          <button className={styles.btnLogin}>Login</button>
        </form>
        <p className={styles.textLogin}>
          dont have an account?
          <Link className={styles.linkLogin}  to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;