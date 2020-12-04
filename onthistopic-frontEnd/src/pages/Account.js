import React, { useEffect, useState } from "react";

import { Link, Redirect } from "react-router-dom";

import Header from "../components/Header";

const Account = () => {
  let [status2, setStatus2] = useState({ redirect: null });
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = () => {
    if (localStorage.getItem("token") === null) {
      console.log(localStorage.getItem("token"));
      setStatus2({ redirect: "/signin" });
    }
    // stay on this route since the user is authenticated
  };

  if (status2.redirect !== null) return <Redirect to={status2.redirect} />;
  return (
    <>
      <Header />
    </>
  );
};
export default Account;
