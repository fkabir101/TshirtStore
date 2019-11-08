import React, { Component } from "react";
import InputField from "./inputField";


class Form extends Component{
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zip: 0,
    }
  }

  updateValue = event =>{
    this.setState({[event.target.id] : event.target.value})
  }

  onSubmit = () =>{
    console.log(this.state);
  }

  render(){
    return (
      <div className='container bg-white rounded-lg p-4'>
      <div className ='row'>
        <div className ='col-6'>
          <form onSubmit = {this.onSubmit}>
            <InputField
              fieldName="First Name"
              id="firstName"
              type="text"
              onChangeValue = {this.updateValue}
            />
            <InputField
              fieldName="Last Name"
              id="lasttName"
              type="text"
              onChangeValue = {this.updateValue}
            />
            <InputField
              fieldName="Email"
              id="email"
              type="text"
              onChangeValue = {this.updateValue}
            />
            <InputField
              fieldName="Address"
              id="address"
              type="text"
              onChangeValue = {this.updateValue}
            />
            <InputField
              fieldName="City"
              id="city"
              type="text"
              onChangeValue = {this.updateValue}
            />
            <InputField
              fieldName="Zip Code"
              id="zip"
              type="number"
              onChangeValue = {this.updateValue}
            />
          </form>
        </div>

        <div className = 'col-6'>
          <h4>Cart</h4>
        </div>
      </div>
      </div>
    )
  }
}

export default Form;