import React from "react";

function LargeShirtCard(){
  return(
    <div>
      <div className = "container">
        <div className = "row">
          <div className = "col-6">
            <img src="https://via.placeholder.com/450x450"></img>
          </div>
          <div className = "col-6">
            <div className="card-body cardColor">
            <h2 className="card-title">Shirt Name</h2>
            <p className="card-text">Description: </p>
            <p className="card-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
            <div className="form-group">
              <div className="row">
                <div className = "col-2">
                  <label for="quantity">Quantity:</label>
                </div>
                <div className = 'col-2'>
                  <input className="form-control mb-2" type="number" value="1" id="quantity"></input>
                </div>
              </div>

              <label for="quantity">Size:</label>
              <div class="btn-group btn-group-lg">
                <button type="button" class="btn btn-outline-light mr-3">S</button>
                <button type="button" class="btn btn-outline-light mr-3">M</button>
                <button type="button" class="btn btn-outline-light mr-3">L</button>
                <button type="button" class="btn btn-outline-light mr-3">XL</button>
              </div>
            </div>
            <h3 className="card-text">Price: $9.99</h3>
            <div className="text-center">
              <button type="button" class="btn btn-success btn-lg btn-block">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default LargeShirtCard;