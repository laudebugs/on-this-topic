import React from "react";
import { Link } from "react-router-dom";
import Logo from "./icons/Logo";
import User from "./icons/User";
const Header = () => (
  <div className="header">
    <div className="siteIcon">
      <Logo />
    </div>
    <Link to="/">
      <div className="siteTtl">
        <h1>ON THIS TOPIC</h1>
      </div>
    </Link>
    <div className="userIcon">
      <User />
    </div>
  </div>
);
export default Header;
