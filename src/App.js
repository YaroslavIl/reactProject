
import "./App.css";
import React from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import { useState, useEffect } from "react";

function App() {
  const [mainArr, setMainArr] = useState([]);
  const [search, setSearch] = useState("");
  const [finalArray, setfinalArray] = useState([]);

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

  return (
    <div className="main">
      <Search childData={childrenCompSearch} />
      <section className="cardContainer container">
        <Card arr={finalArray} />
      </section>
    </div>
  );
}

export default App;
