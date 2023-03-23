import React from 'react';
import { useState, useEffect } from "react";
import CloseButton from "../CloseButton";
import styles from "./Basket.module.css";

const Basked = ({ close, state, arrBasket, fnBasket }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Видалення товару з корзини
  const removeItem = (itemId) => {
    fnBasket(arrBasket.filter((item) => item.id !== itemId));
  };

  // Сума товарів корзини
  useEffect(() => {
    const basketPrice = arrBasket.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotalPrice(basketPrice);
  }, [arrBasket]);

  return (
    <section className="basket">
      {state && (
        <div className={styles.basketFon}>
          <div className={styles.blockBasket}>
            <CloseButton onClick={() => close()} />
            <div className={styles.mainCardBasket}>
              {arrBasket.map((item) => (
                <div key={item.id} className={styles.basketCard}>
                  <div className={styles.imgBasket}>
                    <img
                      height={120}
                      width={120}
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  <div className={styles.infoBlockBasket}>
                    <div className={styles.basketTitleBLock}>
                      <p className={styles.basketTitle}>{item.title}</p>
                      <div>
                        <img
                          onClick={() => removeItem(item.id)}
                          src="./img/basked.png"
                          alt="basket"
                        />
                      </div>
                    </div>
                    <div className={styles.numberBasket}></div>
                    <span className={styles.basketPrise}>{item.price}$</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.price}>
              Price<span className={styles.totalPrice}>{totalPrice} $</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Basked;