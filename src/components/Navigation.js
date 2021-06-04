import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/routines">Routines</Link>
      <Link to="/my-routines">My Routines</Link>
      <Link to="/activites">Activities</Link>
    </div>
  );
};

export default Navigation;
