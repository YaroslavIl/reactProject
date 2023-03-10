import React from 'react';
import styles from './Card.module.css'


const Card = (props) => {
    
    return (
      <div className={styles.card}>
        <div>
          <img
            width={290}
            height={230}
            src={props.images[0]}
            alt={props.title}
          />
        </div>
        <h3 className={styles.cardTitle}>{props.title}</h3>
        <p className={styles.category}>
          <span className={styles.strong}>Category:</span> {props.category}
        </p>
        <p className={styles.brand}>
          <span className={styles.strong}>Brand:</span> {props.brand}
        </p>
        <div className={styles.cardFooter}>
          <div>
            <span className={styles.cena}>{props.price}$</span>
          </div>
          <div>
            <img
              className={styles.basket}
              width="30px"
              height="30px"
              src="./img/Vector.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
};

export default Card;