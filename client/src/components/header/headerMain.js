import React from "react";
import RenderNavbar from "./navButtons";
import "./style/header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbarCustom" id="header">
      <a className="navbar-brand navBrandCustom" id="title" href="/">New Challenger</a>
        <ul className="navbar-right mr-auto">
        </ul>
        <span className="navbar-text">
        <RenderNavbar/>
    </span>

    </nav>
  )
};
export default Header;