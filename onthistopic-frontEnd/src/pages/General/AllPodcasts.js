import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Header from "../../components/Header";
import StillWorking from "../../css/still-working.gif";

const AllPodcasts = () => {
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <img style={{ width: "25%" }} src={StillWorking}></img>
        <p>hmmmm.... still working on this</p>
      </div>
    </>
  );
};
export default AllPodcasts;
