import React from "react";
import { Link } from "react-router-dom";
import Menu from "./icons/Menu";
import $ from "jquery";
const Header = () => {
  return (
    <div className="header">
      <div className="siteIcon">
        <span
          onClick={() => {
            let menu = $(".sideMenu")[0];
            menu.style.animation = "showSideMenu 0.4s";
            menu.style.left = 0;
          }}
        >
          <Menu angle={0} />
        </span>
      </div>
      <Link to="/">
        <div className="siteTtl">
          <h1>ON THIS TOPIC</h1>
        </div>
      </Link>
      <div className="userIcon">
        Z u a <span>&#91;</span>
      </div>
    </div>
  );
};
export default Header;
