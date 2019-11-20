import React, {Component} from "react";
import API from '../../utils/api'

import OrderCard from './orderCard';

class OrderPage extends Component{
  state = {
    orders : []
  }
  componentDidMount = () => {
    API.findOrder()
      .then(res => this.setState({
        orders: res.data
      }))
      .catch(err => console.log(err));
  }
  render(){
    return(
      <div>
        <div  className = 'container pb-5 bg-white'>
          <div className = 'row'>
            {this.state.orders !== 0 ?
              (this.state.orders.map(order =>
                <div className = 'col-4'>
                  <OrderCard
                    key={order._id}
                    orderId = {order._id}
                    name={order.name}
                    email={order.email}
                    item={order.item}
                    address={order.address}
                    city={order.city}
                    zip={order.zip}
                    country={order.country}
                    status={order.status}
                  />
                  </div>
              )) :
              (<p></p>)
            }
          </div>
        </div>    
      </div>
    )
  }
}

export default OrderPage