import React from "react";
import { Link } from "react-router-dom";
const MenuBar = () => (
  <div className="menuBar">
    <Link>
      <h3>Topics</h3>
    </Link>
    <Link>
      <h3>People</h3>
    </Link>
    <Link>
      <h3>Locations</h3>
    </Link>
    <Link>
      <h3>Discover</h3>
    </Link>
    <Link>
      <h3>Editor's Choice</h3>
    </Link>
    <h3 className="searchBox">Search</h3>
  </div>
);

export default MenuBar;
