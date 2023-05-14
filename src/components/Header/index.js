import React from 'react';
import styles from "./Header.module.css";
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signOut} from "firebase/auth";

const Header = ({ openBasket, numberItem, openUser, user }) => {
  const nav = useNavigate();
  //Вихід із системи
  const exitSys = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        nav("/shop");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.headerFon}>
      <div className={`${styles.header} ${styles.container} ${styles.flex}`}>
        <div className={styles.headerLogo}>
          <span className={styles.logoColor}>Technical</span> Shop
        </div>
        <div className={styles.headerMenu}>
          <ul className={styles.flex}>
            <li>
              <Link className={styles.headerLink} to={"/home"}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.headerLink} to={"/shop"}>
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.headerIcon} ${styles.flex}`}>
          <div>
            <img
              onClick={openUser}
              width={25}
              height={30}
              src="./img/user.png"
              alt="user"
            />
          </div>
          {user !== null && (
            <div>
              <img
                onClick={exitSys}
                width={32}
                height={30}
                src="./img/exid.png"
                alt="user"
              />
            </div>
          )}
          <div>
            {numberItem > 0 ? (
              <div className={styles.circle}>{numberItem}</div>
            ) : null}
            <img
              onClick={openBasket}
              width={32}
              height={30}
              src="./img/Vector.svg"
              alt="user"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;