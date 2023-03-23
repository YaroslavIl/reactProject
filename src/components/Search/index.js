import React from "react";
import { useState, useEffect } from "react";
import styles from './Search.module.css'

const Search = (props) => {
  const [state, setState] = useState(false);
  const [search, setSearch] = useState("");
  const [blockHide, setBlockHide] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);

  // запит на дані
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setFilteredProducts(json.products);
      });
  }, []);

  // запис даних які отримали в новий масив з яким будемо працювати
  useEffect(() => {
    setFilteredProducts2(filteredProducts);
  }, [filteredProducts]);

  // функція сортування ціни
  const sortPrice = () => {
    let sortItem;
    if (state) {
      sortItem = [...filteredProducts2].sort((a, b) => b.price - a.price);
    } else {
      sortItem = [...filteredProducts2].sort((a, b) => a.price - b.price);
    }
    setState(!state);
    setFilteredProducts2(sortItem);
  };
// функція відображення блоку категорій
  const togleImg = () => {
    setBlockHide(!blockHide);
  };
// сортування за  категоріями
  const filterCategori = (category) => {
    if (category === "All") {
      setFilteredProducts2(filteredProducts);
    } else {
      const filterProductsCategory = filteredProducts.filter((item) => {
        return item.category === category;
      });
      const sortedProducts = state
        ? filterProductsCategory.sort((a, b) => b.price - a.price)
        : filterProductsCategory.sort((a, b) => a.price - b.price);
      setFilteredProducts2(sortedProducts);
    }
  };

  // функція яка забере посортований масив по ціні або категорія та може передати текст для пошуку
  props.childData(filteredProducts2, search);

  return (
    <section className="searchBlock container">
      <div className={`${styles.blockElem} ${styles.flex}`}>
        <div className={`${styles.filter} ${styles.flex}`}>
          <img onClick={togleImg} src="./img/filtr.png" alt="filtr" />
        </div>
        <div className={`${styles.search} ${styles.flex}`}>
          <input
            value={search}
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src="./img/search.png" alt="search" />
        </div>
        <div className={`${styles.cheep} ${styles.flex}`}>
          {state ? (
            <img onClick={sortPrice} src="./img/up.png" alt="up" />
          ) : (
            <img onClick={sortPrice} src="./img/down.png" alt="up" />
          )}
        </div>
      </div>
      {blockHide && (
        <div className={styles.filterPanel}>
          <span className={styles.categori} onClick={() => filterCategori("All")}>
            All
          </span>
          <span className={styles.categori} onClick={() => filterCategori("laptops")}>
            Laptops
          </span>
          <span
            className={styles.categori}
            onClick={() => filterCategori("fragrances")}
          >
            Fragrances
          </span>
          <span className={styles.categori} onClick={() => filterCategori("skincare")}>
            Skincare
          </span>
          <span
            className={styles.categori}
            onClick={() => filterCategori("groceries")}
          >
            Groceries
          </span>
          <span
            className={styles.categori}
            onClick={() => filterCategori("home-decoration")}
          >
            Home-decoration
          </span>
          <span
            className={styles.categori}
            onClick={() => filterCategori("smartphones")}
          >
            Smartphones
          </span>
        </div>
      )}
    </section>
  );
};

export default Search;
