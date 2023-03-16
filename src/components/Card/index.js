import React, { useState } from 'react';
import styles from './Card.module.css'

// рендер карток товарів
const Card = ({ arr, addItem }) => {
  const [newArr, setNewArr] = useState(
    arr.map((obj) => ({ ...obj, buy: false }))
  );
  
  const onClick = (data,id) => {
    console.log(data, "3");
    // console.log(data.id, "4");
    addItem(data);
    const updateArr = newArr.map((item) => {
      if (item.buy === false) {
        console.log(item.buy, "1");
        return { ...item, buy: true };
      } else {
        console.log(item.buy, "2");
        return { ...item, buy: false };
      }
    });
    
     setNewArr(updateArr);
  };
  // setNewArr(newArr);
  console.log(newArr);
  return arr.map((obj) => (
    <div key={obj.id} className={styles.card}>
      <div>
        <img width={290} height={230} src={obj.images[0]} alt={obj.title} />
      </div>
      <h3 className={styles.cardTitle}>{obj.title}</h3>
      <p className={styles.category}>
        <span className={styles.strong}>Category:</span> {obj.category}
      </p>
      <p className={styles.brand}>
        <span className={styles.strong}>Brand:</span> {obj.brand}
      </p>
      <div className={styles.cardFooter}>
        <div>
          <span className={styles.cena}>{obj.price}$</span>
        </div>
        <div>
          <img
            onClick={() => onClick(obj, obj.id)}
            className={styles.basket}
            width="30px"
            height="30px"
            src={obj.buy ? "./img/buy.png" : "./img/Vector.svg"}
            alt="basket"
          />
        </div>
      </div>
    </div>
  ));
};

export default Card;