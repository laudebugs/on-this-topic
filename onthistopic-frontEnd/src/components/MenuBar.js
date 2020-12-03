import React from "react";
import { Link } from "react-router-dom";
const MenuBar = () => (
  <div className="menuBar">
    <Link to="topics" key="topics">
      <h3>Topics</h3>
    </Link>
    <Link to="/people" key="people">
      <h3>People</h3>
    </Link>
    <Link to="/locations" key="locations">
      <h3>Locations</h3>
    </Link>
    <Link to="/discover" key="discover">
      <h3>Discover</h3>
    </Link>
    <Link to="/editorschoice" key="editorschoice">
      <h3>Editor's Choice</h3>
    </Link>
    <h3 className="searchBox">Search</h3>
  </div>
);

export default MenuBar;
