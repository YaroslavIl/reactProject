
import "./App.css";
import React from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Basked from "./components/Basket";

function App() {
  const [mainArr, setMainArr] = useState([]);
  const [search, setSearch] = useState("");
  //==============================
  const [finalArray, setfinalArray] = useState([]);
  const [basketArr, setBasketArr] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  //==============================
  const [showLogin, setSHowLogin] = useState(false);
  const [showRegister, setSHowRegister] = useState(false);

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
  };

  // Закривання  корзини
  const closeBasketButton = () => {
    return setShowBasket(false);
  };
  // Закривання  Login
  const closeLogin = () => {
    return setSHowLogin(false);
  };
  // Закривання  Register
  const closeRegister = () => {
    setSHowRegister(false)
  }
  //фіксація сторінки при відкритті корзини
  useEffect(() => {
    if (showBasket || showLogin || showRegister) {
      document.body.classList.add("hiden");
    } else {
      document.body.classList.remove("hiden");
    }
  }, [showBasket]);
  //Кількість товару в корзині
  const lengthArr = basketArr.length;

  // // Видалення товару з корзини
  const removeItem = (itemId) => {
    setBasketArr(basketArr.filter((item) => item.id !== itemId));
  };
  // Масив корзини
  const arrBasket = (data) => {
    setBasketArr([...basketArr, data]);
  }
 // функція перевірки ммасиву карточок та масиву корзини для відображення актуального кольору  корзини на карточках
  const auditBasketArr=(argument) => {
            argument.forEach((item) => {
              const isInBasket = basketArr.some((elem) => elem.id === item.id);
              if (!isInBasket) {
                item.buy = false;
              } else {
                item.buy = true;
              }
            })
          }


  
  return (
    <div className="main">
      {showRegister && <Register onClick={closeRegister} />}
      {showLogin && <Login onClick={closeLogin} />}
      <Header openBasket={openBasketButton} numberItem={lengthArr} />
      <Basked
        close={closeBasketButton}
        state={showBasket}
        arrBasket={basketArr}
        fnBasket={setBasketArr}
      />
      <Search childData={childrenCompSearch} />
      <section className="cardContainer container">
        <Card
          arr={finalArray}
          addItem={arrBasket}
          removeObj={removeItem}
          chekBasketElem={auditBasketArr}
        />
      </section>
    </div>
  );
} 

export default App;
