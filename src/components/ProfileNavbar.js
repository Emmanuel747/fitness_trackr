import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";
import { logout, getToken } from '../auth';


const ProfileNavbar = ({username, authenticate}) => {
  const [ click, setClick ] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
    { getToken() && authenticate ?
      (<div className="nav-container">
        <div className="profile-navbar">
          <Link to="/" className="navbar-logo">
            <h1>FitnessTrac.kr</h1>
          </Link>
          <div className="menu-icon" id="mobile-menu" onClick={handleClick}>
            {click ? (
              <>
                <span className="x"></span>
                <span className="x"></span>
                <span className="x"></span>
              </>
            ) : (
              <>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </>
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
                <h3 className="nav-user-welcome">Let's Get Fit {username}!</h3>
            </li>
            <li className="nav-item">
              <Link to="/routines" className="nav-links">
                <h3>Routines</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activities" className="nav-links">
                <h3>Activities</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/myroutines" className="nav-links">
                <h3>Profile</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={() => logout()} className="nav-links nav-links-btn">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div> )
      : (
        <div className="unauthenticatedProfile"> Login to access profile.</div>
      )}
    </> 
  );
}

export default ProfileNavbar;