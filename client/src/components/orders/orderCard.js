import React, {Component} from "react";
import API from '../../utils/api'
class OrderCard extends Component {
  state = {
    status : this.props.status,
    view : true
  }
  onClickFunctionShip = () =>{
    this.setState({status : 'Shipped'}, () => {
      let updateData = {
        _id : this.props._id,
        name : this.props.name,
        email : this.props.email,
        item : this.props.item,
        address : this.props.address,
        city : this.props.city,
        zip : this.props.zip,
        status : this.state.status
      }
      API.update(this.props.orderId, updateData)
    }) 
  }

  onClickFunctionDelete = () =>{
    API.delete(this.props.orderId).then(this.setState({view:false}))
  }

  render(){
    if(this.state.view){
      return(
        <div>
          <div className = "card">
            <div className = 'card-body'>
            <ul>
              <strong>Name:</strong> {this.props.name}
            </ul>
            <ul>
              <strong>Email:</strong> {this.props.email}
            </ul>
            <ul>
              <strong>Item:</strong> {this.props.item}
            </ul>
            <ul>
              <strong>Address:</strong> {this.props.address}
              <strong>  City:</strong> {this.props.city}
              <strong>  Zip:</strong> {this.props.zip}
              <string>  Country:</string> {this.props.country}
            </ul>
            <ul>
              <strong>Status:</strong> {this.state.status}
            </ul>
            <ul>
              <button type="button" className="btn btn-success btn-lg btn-block" onClick = {this.onClickFunctionShip}>Ship Order</button>

              <button type="button" className="btn btn-danger btn-lg btn-block" onClick = {this.onClickFunctionDelete}>Delete Order</button>
            </ul>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(<div></div>)
    }
  }
}

export default OrderCard;
