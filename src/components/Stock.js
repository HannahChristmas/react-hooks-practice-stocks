import React from "react";

function Stock({stock, handleClick}) {


  return (
    <div>
      <div onClick={() => handleClick(stock)} className="card">
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{stock.ticker}: {stock.price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
