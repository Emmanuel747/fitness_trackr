import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/well-guides-4hourmarathon-header-jumbo-v2.gif";
import "./Home.css";

const Home = ({ registerClick, setRegisterClick }) => {
  const handleClick = () => setRegisterClick(!registerClick);

  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-content">
            <h1>Fitness Tracking made Simple<i>r</i></h1>
            <p>
              FitnessTrack<i>r</i>&nbsp; is a web app designed to help you reach your fitness goals faste<i>r</i>
            </p>
            <button onClick={handleClick} className="main-btn">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  zIndex: "1",
                  position: "relative",
                }}
              >
                Get Started
              </Link>
            </button>
          </div>
          <div className="main-img-container">
            <img src={Image} alt="Fitness Tracker" id="main-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;