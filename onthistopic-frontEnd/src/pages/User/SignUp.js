import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Header from "../../components/Header";

const SignUp = () => {
  return (
    <>
      <Header />

      <div className="inputForm">
        <div>
          <form action="/api/signup" method="POST">
            <table>
              <tr>
                <td>
                  <label for="username">First Name</label>
                </td>
                <td>
                  <input type="text" name="firsname" id="firstname"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="username">Last Name</label>
                </td>
                <td>
                  <input type="text" name="lastname" id="lastname"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="username">Username</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required={true}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="email">Email Address</label>
                </td>
                <td>
                  <input type="email" name="email" id="email" required></input>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="password">Enter Password</label>
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
                <td>
                  <label for="password">Confirm Password</label>
                </td>
                <td>
                  <input
                    id="password1"
                    type="password"
                    name="password1"
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <button class="signinbtn" type="submit">
                    Sign up
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <p class="signin">
            Already have an account?{" "}
            <Link key="signInPage" to="/signin">
              sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignUp;
