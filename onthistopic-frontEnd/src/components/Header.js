import React from "react";
import { Link } from "react-router-dom";
import Menu from "./icons/Menu";
import User from "./icons/User";
const Header = () => (
  <div className="header">
    <div className="siteIcon">
      <Menu />
    </div>
    <Link to="/">
      <div className="siteTtl">
        <h1>ON THIS TOPIC</h1>
      </div>
    </Link>
    <div className="userIcon">
      Z u a <span>&#91;</span>
      {/* <User /> */}
    </div>
  </div>
);
export default Header;
