import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";

// рендер карток товарів
const Card = ({ arr, addItem, removeObj, chekBasketElem }) => {
  const [newArr, setNewArr] = useState(
    arr.map((obj) => ({ ...obj, buy: false }))
  );
  useEffect(() => {
    setNewArr(arr.map((obj) => ({ ...obj, buy: false })));
  }, [arr]);
  // зміна кольору корзини
  let start = newArr;
  const controlBasket = (id) => {
    start.forEach((item) => {
      if (item.id === id) {
        item.buy = !item.buy;
      }
    });
  };
  chekBasketElem(start);
  const onClick = (data, id, buy) => {
    // перевірка товару на наявність в корзині  та видалення
    if (buy) {
      removeObj(id);
    } else {
      addItem(data);
    }
    controlBasket(id);
    // // зміна кольору корзини
    // let start = newArr;
    // // auditIcon(start, setNewArr);
    // start.forEach((item) => {
    //   if (item.id === id) {
    //     item.buy = !item.buy;
    //   }
    // });
    // console.log(start, "2222222222222222222222");
  };
  // console.log(newArr, "333333333333333333");

  return newArr.map((obj) => (
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
            onClick={() => onClick(obj, obj.id, obj.buy)}
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
