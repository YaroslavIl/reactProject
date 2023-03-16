
import "./App.css";
import React from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [mainArr, setMainArr] = useState([]);
  const [search, setSearch] = useState("");
  const [finalArray, setfinalArray] = useState([]);
  const [basketArr, setBasketArr] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  //функція яка приймаж текст з пошуку та масив категорій та сортований по ціні
  const childrenCompSearch = (data, search) => {
    setMainArr(data);
    setSearch(search);
  };

  //фільтрує масив по тексту з пошуку
  useEffect(() => {
    let newArr = mainArr.filter((item) => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });
    setfinalArray(newArr);
  }, [search, mainArr]);
  // Відкриття корзини
  const openBasketButton = () => {
    setShowBasket(true);
    return basketArr;
  };
  // Закривання  корзини
  const closeBasketButton = () => {
    setShowBasket(false);
  };
  //фіксація сторінки при відкритті корзини
  useEffect(() => {
    if (showBasket) {
      document.body.classList.add("hiden");
    } else {
      document.body.classList.remove("hiden");
    }
  }, [showBasket]);
  //Кількість товару в корзині
  const lengthArr = basketArr.length;
  

  return (
    <div className="main">
      <Header openBasket={openBasketButton} numberItem={lengthArr} />
      <section className="basket">
        {showBasket && (
          <div onClick={closeBasketButton} className="basketFon">
            <div className="blockBasket">
              <div onClick={closeBasketButton} className="closeButton">
                <span className="upItem"></span>
                <span className="downItem"></span>
              </div>
              {basketArr.map((item) => (
                <div className="basketCard">
                  <div className="imgBasket">
                    <img
                      height={120}
                      width={120}
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  <div className="infoBlockBasket">
                    <div className="basketTitleBLock">
                      <p className="basketTitle">{item.title}</p>
                      <img src="./img/basked.png" alt="basket" />
                    </div>
                    <div className="numberBasket"></div>
                    <span className="basketPrise">{item.price}$</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Search childData={childrenCompSearch} />
      <section className="cardContainer container">
        <Card
          arr={finalArray}
          addItem={(data) => {
            setBasketArr([...basketArr, data]);
          }}
        />
      </section>
    </div>
  );
} 

export default App;
