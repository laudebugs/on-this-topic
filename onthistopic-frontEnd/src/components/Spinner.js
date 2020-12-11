import React from "react";
import SpinnerImg from "../css/spinner.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={SpinnerImg} alt="spinner"></img>
    </div>
  );
};

export default Spinner;
