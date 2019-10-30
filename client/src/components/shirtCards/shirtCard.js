import React from "react";

function ShirtCard(){
  return(
    <div className="card text-center">
      <img className="card-img-top" src="https://via.placeholder.com/150x150" alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">Shirt Color</h5>
        <p className="card-text">Price: $9.99</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  )
};

export default ShirtCard;
