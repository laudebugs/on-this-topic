import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Header from "../components/Header";
import StillWorking from "../css/NotFound.svg";

const NotFound = () => {
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <img style={{ width: "25%" }} src={StillWorking}></img>
        <p>
          Looks like you wandered off somewhere else
          <br />
          <br />
          <Link to="/"> Head back home ⟵</Link>
        </p>
      </div>
    </>
  );
};
export default NotFound;
