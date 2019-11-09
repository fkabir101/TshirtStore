import React, {Component} from "react";
import API from '../../utils/api'
import AliceCarousel from 'react-alice-carousel';
class LargeShirtCard extends Component{

  state = {
    size : 'M',
    price : this.props.price,
    quantity : 1,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    }
  }

  onChangeValue = (event) =>{
    this.setState({quantity: event.target.value});
  }
  getSize = (event) =>{
    this.setState({size: event.target.attributes.getNamedItem('data-key').value})
  }
  onClickFunction = () =>{
   // this.props.addItem(this.state.quantity, this.state.size, this.state.price)
    let orderData = {
      price: this.state.price,
      name: `MetalGearShirt size ${this.state.size}`,
      quantity: this.state.quantity,
      total: this.state.price * this.state.quantity
    }

    API.placeOrder(orderData);
    
  }
  render(){
    return(
      <div>
        <div className = "container pb-5">
          <div className = "row">
            <div className = "col-md-6 col-sm-12">
              <img src={'/images/shirt.jpg'} width="500" height="400"></img>
            </div>
            <div className = "col-md-6 col-sm-12">
              <div className="card-body cardColor">
              <h2 className="card-title">Shirt Name</h2>
              <p className="card-text">Description: </p>
              <p className="card-text">The Evolution of Snake</p>
              <div className="container">
                <div className="row">
                  <div className = "col-2">
                    <label htmlFor="quantity">Quantity:</label>
                  </div>
                  <div className = 'col-2'>
                    <input className="mb-2" type="number" defaultValue ="1" id="quantity" 
                    onBlur ={e => this.onChangeValue(e)}></input>
                  </div>
                </div>
  
                <label htmlFor="quantity">Size:</label>
                <div className="btn-group btn-group-lg" onClick={this.getSize.bind(this)}>
                  <button type="button" className="btn btn-outline-light mr-3" data-key='S'>S</button>
                  <button type="button" className="btn btn-outline-light mr-3" data-key='M'>M</button>
                  <button type="button" className="btn btn-outline-light mr-3" data-key='L'>L</button>
                  <button type="button" className="btn btn-outline-light mr-3" data-key='XL'>XL</button>
                </div>
              </div>
              <h3 className="card-text">Price: ${this.state.price}</h3>
              <div className="text-center">
                <button type="button" className="btn btn-success btn-lg btn-block" onClick = {this.onClickFunction}>BUY NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )    
  }
}

export default LargeShirtCard;