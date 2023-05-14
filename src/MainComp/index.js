import React from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";
import Basked from "../components/Basket";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";

const MainComp = () => {
  // карточки то пошук
  const [mainArr, setMainArr] = useState([]);
  const [search, setSearch] = useState("");
  //Корзина
  const [finalArray, setfinalArray] = useState([]);
  const [basketArr, setBasketArr] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  // Логін та Реєстрація
  const [showLogin, setSHowLogin] = useState(false);
  const [showRegister, setSHowRegister] = useState(false);
  const [users, setUsers] = useState(null);
  // const [userIcon, setUserIcon] = useState(false);

  const navigator = useNavigate()

  // Переходи між логіном  та реєстрацією
  const showReg = () => {
    setSHowRegister(true);
    setSHowLogin(false);
  };
  const showLog = () => {
    setSHowRegister(false);
    setSHowLogin(true);
  };

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
    if (users !== null) {
      setShowBasket(true);
    } else {
      setSHowLogin(true);
    }
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
    setSHowRegister(false);
  };
  //фіксація сторінки при відкритті корзини/логіна/реєстрації
  useEffect(() => {
    if (showBasket || showLogin || showRegister) {
      document.body.classList.add("hiden");
    } else {
      document.body.classList.remove("hiden");
    }
  }, [showBasket, showLogin, showRegister]);
  //Кількість товару в корзині
  const lengthArr = basketArr.length;

  // // Видалення товару з корзини
  const removeItem = (itemId) => {
    setBasketArr(basketArr.filter((item) => item.id !== itemId));
  };
  // Масив корзини
  const arrBasket = (data) => {
    setBasketArr([...basketArr, data]);
  };
  // функція перевірки ммасиву карточок та масиву корзини для відображення актуального кольору  корзини на карточках
  const auditBasketArr = (argument) => {
    argument.forEach((item) => {
      const isInBasket = basketArr.some((elem) => elem.id === item.id);
      if (!isInBasket) {
        item.buy = false;
      } else {
        item.buy = true;
      }
    });
  };


  // перевірка чи користувач в системі
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsers(user);
    });
    return unsubscribe;
  }, []);

  // const [showLogin, setSHowLogin] = useState(false);
 
  // відкриття сторінки з інфо про користувача
  const openUserInfo = () => {
    if (users !== null) {
      // setUserIcon(true);
      navigator("/main");
    } else {
      setSHowLogin(true);
       localStorage.setItem("showLogin", true);
    }
  };


  return (
    <div className="main">
      {showRegister && <Register onClick={closeRegister} showLog={showLog} />}
      {showLogin && (
        <Login onClick={closeLogin} showReg={showReg} showLog={setSHowLogin} />
      )}
      <Header
        openBasket={openBasketButton}
        numberItem={lengthArr}
        openUser={openUserInfo}
        user={users}
      />
      {/*{userIcon && <UserInfo />}*/}
      <Basked
        close={closeBasketButton}
        state={showBasket}
        arrBasket={basketArr}
        fnBasket={setBasketArr}
        lengthBasket={lengthArr}
      />
      <Search childData={childrenCompSearch} />
      <section className="cardContainer container">
        <Card
          arr={finalArray}
          addItem={arrBasket}
          removeObj={removeItem}
          chekBasketElem={auditBasketArr}
          loginVerification={users}
          showLog={setSHowLogin}
        />
      </section>
      <Footer/>
    </div>
  );
};

export default MainComp;
