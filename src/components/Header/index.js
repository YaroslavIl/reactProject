import React from 'react';
import styles from "./Header.module.css";
import { Link } from 'react-router-dom';

const Header = ({ openBasket, numberItem, openUser, user, exitUser }) => {
  return (
    <section className={styles.headerFon}>
      <div className={`${styles.header} ${styles.container} ${styles.flex}`}>
        <div className={styles.headerLogo}>
          <span className={styles.logoColor}>Technical</span> Shop
        </div>
        <div className={styles.headerMenu}>
          <ul className={styles.flex}>
            <li>
              <a className={styles.headerLink} href="">
                Home
              </a>
            </li>
            <li>
              <Link className={styles.headerLink} to={"/shop"}>
                Shop
              </Link>
            </li>
            <li>
              <a className={styles.headerLink} href="">
                Blog
              </a>
            </li>
            <li>
              <a className={styles.headerLink} href="">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.headerIcon} ${styles.flex}`}>
          <div>
            <Link to={"/main"} onClick={openUser}>
              <img
                // onClick={openUser}
                width={25}
                height={30}
                src="./img/user.png"
                alt="user"
              />
            </Link>
          </div>
          {user !== null && (
            <div>
              <img
                onClick={exitUser}
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