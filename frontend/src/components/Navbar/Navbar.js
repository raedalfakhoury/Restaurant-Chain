/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import "../Navbar/Navbar.css";
import { MdOutlinePerson3 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi"; 

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="Navbar1">
      <div className="logoText">
        <h3 id="h1">
          <span className="background"></span>
          <span className="invert"></span>
          <span className="text">crispy chicken</span>
          <span className="invert"></span>
        </h3>
      </div>
      <div className="links">
        <input className="Btn" onClick={() => {navigate("home")}} type="button" value="Home" />

        <input className="Btn" onClick={() => {navigate("about")}} type="button" value="ABOUT US" />
        <input
          className="Btn"
          onClick={() => {navigate("/admin")}}
          type="button"
          value="CONTACT US"
        />
      </div>
      <div className="icon">
        <MdOutlinePerson3
          title="signIn"
          onClick={() => {navigate("login")}}
          className="personIcon"
        />
        <BiLogOut className="logout" title="logout" onClick={() => {}} />
      </div> 
    </div>
  );
};

export default Navbar;
