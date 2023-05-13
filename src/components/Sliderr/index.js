import React, { useState, useEffect } from "react";
import styles from "./Sliderr.module.css";
import {Link, NavLink} from "react-router-dom";


const Sliderr = () => {
  // Стан для зберігання поточного індексу слайда
  const [currentSlide, setCurrentSlide] = useState(0);
  // Стан для кнопки
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Стан для зберігання таймеру
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Запускаємо таймер при монтуванні компонента
    startTimer();

    // Зупиняємо таймер при демонтажі компонента
    return () => clearInterval(timer);
  }, [currentSlide]);

  const startTimer = () => {
    // Встановлюємо інтервал для таймеру
    const interval = setInterval(() => {
      // Перевіряємо, чи є наступний слайд
      if (currentSlide === 3) {
        // Якщо наступного слайда немає, то переходимо на перший слайд
        setCurrentSlide(0);
      } else {
        // Якщо наступний слайд є, то переходимо на нього
        setCurrentSlide(currentSlide + 1);
      }
    }, 4000);

    // Зберігаємо інтервал таймера в стані
    setTimer(interval);
  };

  // Обробник події, який викликається при кліку на індикатор слайду
  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.customSlider}>
      <div
        className={`${styles.button} ${isExpanded ? styles.expanded : ""}`}
        onMouseEnter={toggleExpand}
        onMouseLeave={toggleExpand}
      >
        <Link to={"/shop"} className={styles.span}>
          GO SHOP
        </Link>
      </div>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.slide}
          style={{
            backgroundImage: `url(./img/${currentSlide + 1}.jpg)`,
            backgroundSize: "cover",
            transition: "background-image 2s ease-in-out",
          }}
        ></div>
      </div>
      {/* контейнер для кружків з навігацією */}
      <div className={styles.indicatorsContainer}>
        {/*  кружки для кожного слайду */}
        <div
          className={`${styles.indicator} ${
            currentSlide === 0 ? styles.active : ""
          }`}
          onClick={() => handleIndicatorClick(0)}
        />
        <div
          className={`${styles.indicator} ${
            currentSlide === 1 ? styles.active : ""
          }`}
          onClick={() => handleIndicatorClick(1)}
        />
        <div
          className={`${styles.indicator} ${
            currentSlide === 2 ? styles.active : ""
          }`}
          onClick={() => handleIndicatorClick(2)}
        />
        <div
          className={`${styles.indicator} ${
            currentSlide === 3 ? styles.active : ""
          }`}
          onClick={() => handleIndicatorClick(3)}
        />
      </div>
    </div>
  );
};

export default Sliderr;
