
import "./App.css";
import React from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import CloseButton from "./components/CloseButton";

function App() {
  const [mainArr, setMainArr] = useState([]);
  const [search, setSearch] = useState("");
  //==============================
  const [finalArray, setfinalArray] = useState([]);
  const [basketArr, setBasketArr] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  //==============================
  const [showLogin, setSHowLogin] = useState(false)

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

  // Видалення товару з корзини
  const removeItem = (itemId) => {
    setBasketArr(basketArr.filter((item) => item.id !== itemId));
  };

  // Сума товарів корзини
  useEffect(() => {
    const basketPrice = basketArr.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotalPrice(basketPrice);
  }, [basketArr]);

  // console.log(basketArr.map((item)=>item.id), '111111111111111111111111');

  return (
    <div className="main">
      {showLogin && <Login />}
      {/* <Login /> */}
      <Header openBasket={openBasketButton} numberItem={lengthArr} />
      <section className="basket">
        {showBasket && (
          <div className="basketFon">
            <div className="blockBasket">
              <CloseButton close={closeBasketButton} />
              <CloseButton onClick={()=>closeBasketButton()} />
              {/* <div onClick={closeBasketButton} className="closeButton">
                <span className="upItem"></span>
                <span className="downItem"></span>
              </div> */}
              <div className="mainCardBasket">
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
                        <div>
                          <img
                            onClick={() => removeItem(item.id)}
                            src="./img/basked.png"
                            alt="basket"
                          />
                        </div>
                      </div>
                      <div className="numberBasket"></div>
                      <span className="basketPrise">{item.price}$</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="price">
                Price<span className="totalPrice">{totalPrice} $</span>
              </div>
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
          removeObj={removeItem}
          chekBasketElem={(argument) => {
            // x = argument
            // argument.forEach((item) => {
            //   if (item.id !== basketArr.forEach((elem) => elem.id)) {
            //     item.buy = false;
            //     console.log(item, "$$$$$$$$$$$$$$$$");
            //     console.log(basketArr, "*****************8");
            //     console.log(
            //       basketArr.forEach((elem) => elem.id),
            //       "##############"
            //     );
            //   } else {
            //     item.buy = true;
            //   }
            // });

            argument.forEach((item) => {
              const isInBasket = basketArr.some((elem) => elem.id === item.id);
              if (!isInBasket) {
                item.buy = false;
              } else {
                item.buy = true;
              }
            });
            // console.log(argument);
          }}
        />
      </section>
    </div>
  );
} 

export default App;
