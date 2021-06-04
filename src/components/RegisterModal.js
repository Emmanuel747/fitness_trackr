import "./Modal.css";
import img from "../assets/greenSquat.png";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login, getToken } from '../auth'


const RegisterModal = ({
      loginClick,
      setLoginClick,
      registerClick,
      setRegisterClick,
      authenticate, 
      setAuthentication, 
      username, 
      setUsername, 
      token, 
      setToken 
}) => {
   const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;
   const [ password, setPassWord ] = useState();
   const [ passwordConfirmation, setPassWordConfirmation ] = useState();

  function createUser(event) {
    event.preventDefault();
    if (username && password && password === passwordConfirmation) {
      fetch(
        `${REACT_APP_FITNESS_TRACKER_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: username,
              password: password,
          })
        })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          login(result.token);
          setToken(getToken());
          isLoggedIn(result)
        })
        .catch(console.error);
    }
  }

  const isLoggedIn = (result) => {
    if (result.token) {
      console.log("Thanks For Signing Up! Please Log In.");
      alert('"Thanks For Signing Up! Please Log In."');
      setAuthentication(true);
    } else {
      console.log("not logged in");
    }
  };

  // if (token) {
  //   return <Redirect to="/myroutines" />;
  // }

  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("register-modal")) {
      setRegisterClick(!registerClick);
    }
  });

  const handleClick = () => {
    setLoginClick(!loginClick);
    setRegisterClick(!registerClick);
  };

  const close_btn = () => setRegisterClick(!registerClick);

  return (
    <>
      <div
        className={registerClick ? "modal-open" : "modal"}
        id="register-modal"
      >
        <div className="modal-content">
          <span onClick={close_btn} className="close-btn">&times;</span>
          <div className="modal-content-left">
            <img src={img} alt="Fitness Stats" id="modal-img" />
          </div>
          <div className="modal-content-right">
            <form className="modal-form" id="form" onSubmit={ createUser }>
              <h1>
                Get started today! Create your account by filling out the form
                below.
              </h1>
              <div className="form-validation">
                <input
                  type="text"
                  className="modal-input"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="form-validation">
                <input
                  type="password"
                  className="modal-input"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    setPassWord(event.target.value);
                  }}
                />
              </div>
              <div className="form-validation">
                <input
                  type="password"
                  className="modal-input"
                  id="password_confirm"
                  name="password"
                  placeholder="Confirm your password"
                  onChange={(event) => {
                    setPassWordConfirmation(event.target.value);
                  }}
                />
              </div>
              <input
                type="submit"
                className="modal-input-btn"
                value="Sign Up"
              />
              <span className="modal-input-login">
                Already have an account? Login{" "}
                <Link
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    color: "var(--brightorange)",
                    fontSize: "600",
                  }}
                  to="/login"
                >
                  here
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;