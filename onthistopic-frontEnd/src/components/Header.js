import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Menu from "./icons/Menu";
import $ from "jquery";

import { connect } from "react-redux";
import { getStatus } from "../components/thunks";
import { getLoggedInStatus } from "../components/selectors";

const Header = ({ beginStatusUpdate, isLoggedIn }) => {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    setShow(isLoggedIn);
  }, [isLoggedIn, show]);
  // request options
  const options = {
    method: "POST",
  };
  let userMenu = (
    <div
      onMouseLeave={() => {
        $(".userMenu").css("display", "none");
      }}
      className="userMenu"
    >
      <p>
        <Link to="/account">My account</Link>
      </p>
      <p>
        <span
          onClick={async () => {
            await fetch("/signout", options);
            beginStatusUpdate();
            <Redirect to="/" />;
          }}
        >
          Sign out
        </span>
      </p>
    </div>
  );
  if (!show) {
    userMenu = (
      <div
        onMouseLeave={() => {
          $(".userMenu").css("display", "none");
        }}
        className="userMenu"
      >
        <p>
          <Link to="/signin">Sign in</Link>
        </p>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
  }
  return (
    <div className="header">
      {userMenu}
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
      <div className="accountIcons">
        <div style={{ display: `${isLoggedIn ? "inline-block" : "none"}` }}>
          <svg viewBox="0 0 400 400">
            <text x="75" y="325">
              Z
            </text>
          </svg>
        </div>
        <div style={{ display: `${isLoggedIn ? "inline-block" : "none"}` }}>
          <svg viewBox="0 0 400 400">
            <text x="75" y="325">
              u
            </text>
          </svg>
        </div>
        <div style={{ display: `${isLoggedIn ? "inline-block" : "none"}` }}>
          <svg viewBox="0 0 400 400">
            <text x="75" y="325">
              a
            </text>
          </svg>
        </div>
        <div>
          <svg
            className="usr"
            style={{
              fontWeight: "500",
              fontSize: "300px",
            }}
            viewBox="0 0 400 400"
            onMouseOver={(e) => {
              $(".userMenu").css(
                "top",
                $(".usr").offset().top + $(".usr").height() + 5
              );

              $(".userMenu").css("display", "block");
            }}
          >
            {" "}
            <circle cx="200" cy="200" r="200"></circle>
            <text x="75" y="325">
              d
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  isLoggedIn: getLoggedInStatus(state.user),
});

const mapDispatchToProps = (dispatch) => ({
  beginStatusUpdate: () => dispatch(getStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
