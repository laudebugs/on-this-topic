import React, { useEffect, useState } from "react";

import { Link, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import { connect } from "react-redux";
import { getStatus } from "../../components/thunks";
import { getUser } from "../../components/selectors";
import StillWorking from "../../css/still-working.gif";

const Account = ({ user, beginStatusUpdate }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    beginStatusUpdate();
    setLoaded(true);
  }, [loaded]);
  console.log(user.user);

  if (!loaded) return <div></div>;
  else {
    if (!user.user.loggedIn) return <Redirect to="/signin" />;

    return (
      <>
        <Header />
        <div style={{ textAlign: "center" }}>
          <img style={{ width: "25%" }} src={StillWorking}></img>
          <p>hmmmm.... still working on this</p>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  beginStatusUpdate: () => dispatch(getStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
