import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Header from "../components/Header";

const SignIn = () => {
  return (
    <>
      <Header />

      <div className="inputForm">
        <div>
          <form action="/login" method="POST">
            <table>
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
              </tr>
              <tr>
                <td colspan="2">
                  <button class="signinbtn" type="submit">
                    Sign in
                  </button>
                </td>
              </tr>
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
