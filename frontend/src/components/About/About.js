import React from "react";
import "../About/About.css"; 
import Navbar from '../Navbar/Navbar' 
const About = () => {
  return (
    <> 
    <Navbar /> 
    <div className="About">
      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704672000&semt=sph)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p>About Us</p>
      </div>
      <div className="content">
        <h1 style={{textAlign:"center"}}>Welcome To Crispy Chicken</h1>
        <p style={{textAlign:"center"}} className="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore gna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
      </div>
      <div className="leftAndRight">
        <div className="left" style={{marginTop:"20px"}}>
          <iframe
            src="https://www.youtube.com/embed/F4ffPWlqlDw"
            aria-controls="none"
            title=" "
            width="800"
            height="800"
          ></iframe>
        </div> 
      </div>
      
      <div style={{display:"flex"  , width:"100%" , justifyContent:"center" , backgroundColor:"black"}}>
        <img height="200px" alt='' src='https://crispychicken.rest/wp-content/uploads/2020/09/Arabic-english-logo-9001.png'/>
    </div>
    </div>
    </>
  );
};

export default About;
