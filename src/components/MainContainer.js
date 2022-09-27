import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

const [stocks, setStocks] = useState([])
const [portfolioStocks, setPortfolioStocks] = useState([])
const [stockFilter, setStockFilter] = useState('')
const [sortBy, setSortBy] = useState('')


useEffect(() => {
  fetch("http://localhost:3001/stocks")
  .then((res) => res.json())
  .then((data) => (setStocks(data)))
}, [])

useEffect(() => {
  if(sortBy === 'Alphabetically'){
    const sortedStocks = sortByName()
    setStocks(sortedStocks)
  } else {
    const sortedStocks = sortByPrice()
    setStocks(sortedStocks)
  }
}, [sortBy])

const sortStocks = (e) => {
  setSortBy(e.target.value)
}

const sortByName = () => {
  return [...stocks].sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
}

const sortByPrice = () => {
  return [...stocks].sort((a, b) => a.price - b.price);
}

const buyStock = (stock) => {
  if(!portfolioStocks.includes(stock)){
    const updatedPortfolioStocks = [...portfolioStocks, stock]
    setPortfolioStocks(updatedPortfolioStocks)
  } else {
    alert("You've already added this. Chill.")
  }
}

const sellStock = (stock) => {
   const updatedPortfolioStocks = portfolioStocks.filter(myStock => myStock.id !== stock.id) 
   setPortfolioStocks(updatedPortfolioStocks)
}
  
function setFilter(e) {
  setStockFilter(e.target.value)
}

  return (
    <div>
      <SearchBar setFilter={setFilter} sortStocks={sortStocks} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stockFilter={stockFilter} stocks={stocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
