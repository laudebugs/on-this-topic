import React, { useEffect, useState } from "react";
import * as QueryString from "query-string";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header";

const SignIn = () => {
  const params = QueryString.parse(window.location.search);
  console.log(params);

  let status = "";
  const checkAuth = () => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      status = "/";
    }
    // stay on this route since the user is authenticated
  };
  checkAuth();

  let errorMessage = <div></div>;
  if (params.error) {
    errorMessage = (
      <tr>
        <td className="errorMessage" colspan="2">
          Incorrect Username or Password.
          <br />
          Try again.
        </td>
      </tr>
    );
  }
  // if (status.redirect !== "") return <Redirect to={status.redirect} />;
  return (
    <>
      <Header />
      <div className="inputForm">
        <div>
          <form action="/api/signin" method="POST">
            <table>
              {errorMessage}
              <tr>
                <td>
                  <label for="username">Username</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="password">Password</label>
                </td>
                <td>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                  ></input>
                </td>
              </tr>{" "}
              <td colspan="2">
                <button class="signinbtn" type="submit">
                  Sign in
                </button>
              </td>
            </table>
          </form>
          <p class="signin">
            New here?{" "}
            <Link key="signUnPage" to="/signup">
              sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignIn;
