import React from "react";

import Logo from "../css/images/logo.png";
import User from "../css/images/userDark.png";
const Header = () => (
  <div>
    <div>
      <img src={Logo} alt="On This Topic icon" />
    </div>
    <div>
      <h1>ON THIS TOPIC</h1>
    </div>
    <div>
      <img src={User} alt="User" />
    </div>
  </div>
);
export default Header;
