import React, {Component} from "react";
import API from '../../utils/api'

class Success extends Component{
  render(){
    return(
      <div className="card text-center">
        <div className="card-body">
          <h1>Thank You For Your Purchase</h1>
        </div>
      </div>
    )
  }
}

export default Success;