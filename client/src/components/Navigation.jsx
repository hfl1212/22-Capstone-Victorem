import React, { useState } from "react";
import {useHistory} from "react-router";
import { Link, useLocation } from "react-router-dom";
import SignInModal from "./SignInModal";
import Headroom from "react-headroom";

const Navigation = () => {
  const history = useHistory()
  const initialState = (window.localStorage.userID !== undefined)
  const [isLoggedIn, setIsLoggedIn] = useState(initialState)
  const rootPath = useLocation().pathname.split("/")[1];

  async function signOut() {
    let response = await fetch(
      "/users/signout", 
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    let statusInfo = await response.json();
    if (statusInfo.status === "success") {
      window.localStorage.removeItem("userID")
      window.localStorage.removeItem("username")
      setIsLoggedIn(false)
      alert("Successfully signed out!")
      history.push("/");
    } else {
      alert("Error: " + statusInfo.error)
    }
  }

  // this callback function is passed to signInModal so that it can change the "isLoggedIn" state
  // , so that the nav bar will re-render when user log in/out
  function handleUserAuth(status){
    setIsLoggedIn(status)
  }

  return (
    <div>
      <Headroom>
        <div className="sticky nav-bg pt-3 pb-3">
          <nav className="navbar navbar-expand-xl navbar-light p-0">
            <Link className="navbar-brand" to="/">
              <h3 className="mb-0">Pawdy</h3>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className={"nav-item " + (rootPath === "" ? "active" : "")}>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                
                <li
                  className={
                    "nav-item " + (rootPath === "posts" ? "active" : "")
                  }
                >
                  <Link className="nav-link" to="/posts">
                    Request
                  </Link>
                </li>
                {isLoggedIn ? (<>
                  <li
                    id="profile_link"
                    className={
                      "nav-item " + (rootPath === "profile" ? "active" : "")
                    }
                  >
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>) : (<></>)}
              </ul>
              <div className="nav-item active" id="identity_div">
                {isLoggedIn ? (<>
                  <p id="hello-message"> Hello, {window.localStorage.username}!</p>
                  <button className="btn btn-danger" onClick={signOut}>
                    Sign out
                  </button>
                </>): (<>
                  <button
                    className="btn btn-main"
                    data-toggle="modal"
                    data-target={"#signInModal"}
                  >
                    Sign in
                  </button>
                </>)}
                
              </div>
            </div>
          </nav>
        </div>
      </Headroom>
      <SignInModal handleUserAuth={handleUserAuth}/>
    </div>
  );
};

export default Navigation;
