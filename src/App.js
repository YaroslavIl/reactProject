
import './App.css';
import React from 'react';
import Card from "./components/Card";
import Search from "./components/Search"
import { useState, useEffect } from 'react';




function App() {

  const [productArr, setProductArr] = useState([])
  const [state, setState] = useState(false);
  const [search, setSearch] = useState("");
  const [blockHide, setBlockHide] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProductArr(json.products);
        setFilteredProducts(json.products);
      });
  }, []);
  
  const sortPrice = () => {
    let sortItem
    if (state) {
      sortItem = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else {
      sortItem = [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    setState(!state)
    setFilteredProducts(sortItem);
  }
  const filterSearch = filteredProducts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const togleImg = () => {
    setBlockHide(!blockHide)
  }
  
  const filterCategori = (category) => {
    
    if (category === 'All') {
      setFilteredProducts(filteredProducts);
    } else {
      const filterProductsCategory = filteredProducts.filter(
        (item) => item.category === category
      );
      const sortedProducts = state
        ? filterProductsCategory.sort((a, b) => b.price - a.price)
        : filterProductsCategory.sort((a, b) => a.price - b.price);
      setFilteredProducts(sortedProducts);
    }
  };
  
  
  
  
  return (
    <div className="main">
      <section className="searchBlock container">
        <div className="blockElem flex">
          <div className="filter flex">
            <img onClick={togleImg} src="./img/filtr.png" alt="filtr" />
          </div>
          <div className="search flex">
            <input
              value={search}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <img src="./img/search.png" alt="search" />
          </div>
          <div className="cheep flex">
            {state ? (
              <img onClick={sortPrice} src="./img/up.png" alt="up" />
            ) : (
              <img onClick={sortPrice} src="./img/down.png" alt="up" />
            )}
          </div>
        </div>
        {blockHide && (
          <div className="filterPanel">
            <span
              className="categori"
              onClick={ () => filterCategori("All")}
            >
              All
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Laptops")}
            >
              Laptops
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Fragrances")}
            >
              Fragrances
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Skincare")}
            >
              Skincare
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Groceries")}
            >
              Groceries
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Home-decoration")}
            >
              Home-decoration
            </span>
            <span
              className="categori"
              onClick={ () => filterCategori("Smartphones")}
            >
              Smartphones
            </span>
          </div>
        )}
      </section>
      {/* <Search/> */}
      <section className="cardContainer container">
        {filterSearch.map((obj) => (
          <Card
            key={obj.id}
            brand={obj.brand}
            category={obj.category}
            price={obj.price}
            title={obj.title}
            images={obj.images}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
