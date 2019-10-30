import React, { Component } from "react";
import { withRouter } from 'react-router';

class RenderNavbar extends Component {
  render() {
    return (
      <div>
        <ul className="nav pull-right">
          <li className="nav-item">
            <a className="btn btn-secondary" href="/cart">Cart</a>
          </li>
        </ul>
      </div>
    )
  }
}


export default withRouter(RenderNavbar);