import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, handleClick, stockFilter}) {

const filteredStocks = stocks.filter(stock => {
  if (stockFilter === "") return true
  if (stockFilter === stock.type) return true
})

  const stocksOnLoading = filteredStocks.map((stock) => {
    return(
      <Stock handleClick={() => handleClick(stock)} key={stock.id} stock={stock}/>
    )
  })

  return (
    <div>
      <h2>Stocks</h2>
      {stocksOnLoading}
    </div>
  );
}

export default StockContainer;
