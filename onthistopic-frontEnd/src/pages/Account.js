import React, { useEffect, useState } from "react";

import { Link, Redirect } from "react-router-dom";

import Header from "../components/Header";
import { connect } from "react-redux";
import { getStatus } from "../components/thunks";
import { getLoggedInStatus } from "../components/selectors";
import StillWorking from "../css/still-working.gif";

const Account = ({ beginStatusUpdate, isLoggedIn }) => {
  beginStatusUpdate();
  if (!isLoggedIn) return <Redirect to="/signin" />;

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

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  isLoggedIn: getLoggedInStatus(state.user),
});

const mapDispatchToProps = (dispatch) => ({
  beginStatusUpdate: () => dispatch(getStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
