import React, {Component} from 'react';

class InputField extends Component {
  render(){
    return(
      <div className="form-group">
        <label>{`${this.props.fieldName}:`}</label>

        <input id={this.props.id} type={this.props.type} className="form-control" onBlur ={this.props.onChangeValue}></input>

      </div>
    )
  }
}

export default InputField;