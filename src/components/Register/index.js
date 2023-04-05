import React from "react";
import CloseButton from "../CloseButton";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import "firebase/compat/auth";
import { createUser } from "../../firebaseTEsT";
import { startSession } from "../../session";
import { Link, useNavigate } from "react-router-dom";


const Register = ({ onClick, showLog }) => {
  // стани для почти
  const [inputEmaillReg, setInputEmaillReg] = useState("");
  const [emaillError, setemaillError] = useState("Email cannot be empty");
  const [emaillCheck, setEmaillCheck] = useState(false);
  // стани для паролю
  const [inputPasswordReg, setInputPasswordReg] = useState("");
  const [passwordError, setPasswordError] = useState(
    "Password cannot be empty"
  );
  const [passwordCheck, setPasswordCheck] = useState(false);
  // стани для повтору пароля
  const [inputRepeatPasswordReg, setInputRepeatPasswordReg] = useState("");
  const [repeatPasswordCheck, setRepeatPasswordCheck] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(
    "Passwords do not match"
  );
  // стани для імені користувача
  const [inputUserReg, setInputUserReg] = useState("");
  const [userError, setUserError] = useState("UserName cannot be empty");
  const [userCheck, setUserCheck] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  // стани для відображення форми реєстрації
  const [hide, setHide] = useState(false);
  // відключення кнопки видправки
  useEffect(() => {
    if (emaillError || passwordError || userError || repeatPasswordError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [emaillError, passwordError, userError, repeatPasswordError]);

  //валідація input
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmaillCheck(true);
        break;
      case "password":
        setPasswordCheck(true);
        break;
      case "user":
        setUserCheck(true);
        break;
      case "repeatPassword":
        setRepeatPasswordCheck(true);
        break;
    }
  };

  const emailHandler = (e) => {
    setInputEmaillReg(e.target.value);
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(e.target.value)) {
      setemaillError("Enter a valid email");
    } else {
      setemaillError("");
    }
  };
  const userlHandler = (e) => {
    setInputUserReg(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 12) {
      setUserError("Username length must be greater than 4 and less than 12");
      if (!e.target.value) {
        setUserError("UserName cannot be empty");
      }
    } else {
      setUserError("");
    }
  };
  const passwordlHandler = (e) => {
    setInputPasswordReg(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 8) {
      setPasswordError(
        "Password length must be greater than 6 and less than 8"
      );
      if (!e.target.value) {
        setPasswordError("Password cannot be empty");
      }
    } else {
      setPasswordError("");
    }
  };
  const repeatPasswordHandler = (e) => {
    setInputRepeatPasswordReg(e.target.value);
    if (e.target.value !== inputPasswordReg) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let loginResponse = await createUser(
        inputUserReg,
        inputEmaillReg,
        inputPasswordReg,
      );
      startSession(loginResponse.user);
      setHide(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.fonLogin}>
      <div className={styles.blockLogin}>
        <div className={styles.closeLogin}>
          <h2 className={styles.titleLogin}>Register</h2>
          <CloseButton onClick={onClick} />
        </div>
        {hide ? (
          <h2 className={styles.success}>Successful registration</h2>
        ) : (
          <form onSubmit={onSubmit}>
            <input
              value={inputEmaillReg}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="email"
              type="email"
              placeholder="Email"
            />
            {emaillCheck && <div style={{ color: "red" }}>{emaillError}</div>}

            <input
              value={inputUserReg}
              onChange={(e) => userlHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="user"
              type="text"
              placeholder="Username"
            />
            {userCheck && <div style={{ color: "red" }}>{userError}</div>}
            <input
              value={inputPasswordReg}
              onChange={(e) => passwordlHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
            {passwordCheck && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <input
              value={inputRepeatPasswordReg}
              onChange={(e) => repeatPasswordHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
            />
            {repeatPasswordCheck && (
              <div style={{ color: "red" }}>{repeatPasswordError}</div>
            )}
            <button
              disabled={!inputValid}
              type="submit"
              className={styles.btnLogin}
            >
              Register
            </button>
          </form>
        )}
        <p className={styles.textLogin}>
          dont have an account?
          <Link onClick={showLog} className={styles.linkLogin} to="/Login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
