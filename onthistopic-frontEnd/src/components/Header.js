import React from "react";
import { Link } from "react-router-dom";
import Logo from "../css/images/logoDark.png";
// import User from "../css/images/userDark.png";
const Header = () => (
  <div className="header">
    <div className="siteIcon">
      <img src={Logo} alt="On This Topic icon" />
    </div>
    <Link to="/">
      <div className="siteTtl">
        <h1>ON THIS TOPIC</h1>
      </div>
    </Link>
    <div className="userIcon">{/* <img src={User} alt="User" /> */}</div>
  </div>
);
export default Header;
