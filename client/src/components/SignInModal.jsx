import React from "react";
import {useHistory} from "react-router";

const SignInModal = (props) => {
  const history = useHistory()

  async function createAccount(e) {
    e.preventDefault()
    
    let readyForFetch = true
    let username = document.getElementById('signup_username').value;
    let email = document.getElementById('signup_email').value;
    let password = document.getElementById('signup_password').value;
    let confirmPassword = document.getElementById('signup_confirm_password').value
    
    if(!username) {
      document.querySelector(".form__message2").innerHTML = "Please enter a username"
      readyForFetch = false
    } else if(!email || !email.endsWith("@uw.edu")) {
      document.querySelector(".form__message2").textContent = "Please use your UW email"
      readyForFetch = false
    } else if(password.length < 6) {
      document.querySelector(".form__message2").textContent = "Password must be at least 6 characters long"
      readyForFetch = false
    } else if(confirmPassword.length < 6 || confirmPassword !== password) {
      document.querySelector(".form__message2").textContent = "Your passwords do not match. Please try again."
      readyForFetch = false
    }
    
    if(readyForFetch) {
      const myData = {
        username: username,
        email: email,
        password: password
      }
    
      let postPetResponse = await fetch(`/users/signup`,
      {method: "POST", body: JSON.stringify(myData), headers: {'Content-Type': 'application/json'}, mode: "cors"}
      )
      let status = await postPetResponse.json();
      console.log(status)
      if(status.status === "success"){
        document.getElementById("signup_username").value = "";
        document.getElementById("signup_email").value = "";
        document.getElementById("signup_password").value = "";
        document.getElementById("signup_confirm_password").value = "";
        alert(status.message)
        document.querySelector("#login").classList.remove("form--hidden");
        document.querySelector("#createAccount").classList.add("form--hidden");
      } else{
        document.querySelector(".form__message2").textContent = "Error: " + status.message
      }
    }
  }
  
  async function signIn(e) {
    e.preventDefault();
    let email = document.getElementById("signin_email").value
    let password = document.getElementById("signin_password").value
    let loginData = {
        email: email,
        password: password
    }
    let response = await fetch(
        "/users/signin",
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
              },
            mode: "cors"
        }
    );
    let statusInfo = await response.json();
    if(statusInfo.status === "success") {
      document.querySelector(".form__message").textContent = ""
      // store user information in local storage
      window.localStorage.setItem("userID", statusInfo.user._id)
      window.localStorage.setItem("username", statusInfo.user.username)

      console.log(localStorage)
      // tell user they are signed in
      alert("Successfully signed in")
      // close sign in modal
      document.getElementById("signInModal").style.display = "none"
      // re-render nav bar
      props.handleUserAuth(true)
      if(statusInfo.user.isFirstTime) {
        history.push('/profile')
      }
    } else {
      document.querySelector(".form__message").textContent = "Error: " + statusInfo.message
    }
  }

  function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = message;
  }

  function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    document
      .querySelector("#linkCreateAccount")
      .addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
      });

    document.querySelector("#linkLogin").addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
    });

    document.querySelectorAll(".form__input").forEach((inputElement) => {
      inputElement.addEventListener("blur", (e) => {
        if (
          e.target.id === "signupUsername" &&
          e.target.value.length > 0 &&
          e.target.value.length < 10
        ) {
          setInputError(
            inputElement,
            "Username must be at least 10 characters in length"
          );
        }
      });

      inputElement.addEventListener("input", (e) => {
        clearInputError(inputElement);
      });
    });
  });

  return (
    <section className="modal fade" id="signInModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title mx-auto">Welcome to Pawdy</h1>
          </div>
          <div className="modal-body">
            <form className="form" id="login" onSubmit={signIn}>
              <h1 className="form__title">Login With UW Email</h1>
              <span className="form__message"></span>
              <div className="form__input-group">
                <label htmlFor="fname">UW Email</label>
                <input type="text" className="form__input" id="signin_email"></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form__input"
                  id="signin_password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <button className="form__button" type="submit">
                Sign In
              </button>
              <p className="form__text">
                <a href="#" className="form__link">
                  Forgot your password?
                </a>
              </p>
              <p className="form__text">
                <a className="form__link" href="./" id="linkCreateAccount">
                  Don't have an account? Create account
                </a>
              </p>
            </form>
            <form className="form form--hidden" id="createAccount">
              <h1 className="form__title">Create Account</h1>
              <span className="form__message2"></span>
              <div className="form__input-group">
                <input
                  type="text"
                  id="signup_username"
                  className="form__input"
                  autoFocus
                  placeholder="Username"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  type="text"
                  className="form__input"
                  id="signup_email"
                  autoFocus
                  placeholder="Email Address"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  id="signup_password"
                  type="password"
                  className="form__input"
                  autoFocus
                  placeholder="Password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <div className="form__input-group">
                <input
                  id="signup_confirm_password"
                  type="password"
                  className="form__input"
                  autoFocus
                  placeholder="Confirm password"
                ></input>
                <div className="form__input-error-message"></div>
              </div>
              <button className="form__button" type="submit" onClick={createAccount}>
                Submit
              </button>
              <p className="form__text">
                <a className="form__link" href="./" id="linkLogin">
                  Already have an account? Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInModal;
