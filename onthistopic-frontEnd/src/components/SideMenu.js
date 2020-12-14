import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./icons/Menu";
import $ from "jquery";
const SideMenu = () => {
  useEffect(() => {
    console.log("menu");
  }, []);
  return (
    <div
      onMouseLeave={() => {
        let menu = $(".sideMenu")[0];
        menu.style.animation = "hideSideMenu 0.4s";
        menu.style.left = "-400px";
      }}
      className="sideMenu"
    >
      <div>
        <span
          onClick={() => {
            let menu = $(".sideMenu")[0];
            menu.style.animation = "hideSideMenu 0.4s";
            menu.style.left = "-400px";
          }}
        >
          <Menu angle={45} />
        </span>
        <hr />
        <div className="menuItems">
          <p>
            <Link key="topics" to="/topics">
              <span className="specialChar">n </span> Topics
            </Link>
          </p>
          <p>
            <Link key="people" to="/people">
              <span className="specialChar">o </span> People
            </Link>
          </p>
          <p>
            <Link key="locations" to="/locations">
              <span className="specialChar">g </span> Locations
            </Link>
          </p>
          <p>
            <Link key="discover " to="/discover">
              <span className="specialChar">m </span> Discover
            </Link>
          </p>
          <p>
            <Link key="editorschoice" to="/editorschoice">
              <span className="specialChar">G </span> Editor's Choice
            </Link>
          </p>
          <p>
            <Link key="editorschoice" to="/blog">
              <span className="specialChar">y </span> Blog
            </Link>
          </p>
        </div>
        <hr />
        <p>
          <Link key="submitpod" to="/submit-pod">
            <span className="specialChar">{")"}</span>Submit podcast
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SideMenu;
