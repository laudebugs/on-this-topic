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
      <h3 style={{ textAlign: "center" }}>Editor's Choice</h3>
    </Link>
    <Link to="/blog" key="blog">
      <h3 style={{ textAlign: "right" }}>Blog</h3>
    </Link>
  </div>
);

export default MenuBar;
