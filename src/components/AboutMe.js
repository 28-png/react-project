import React from "react";
import "./AboutMe.css";
import photo1 from "../assets/lawyer-img.jpg";
import photo2 from "../assets/lawyer-image3.jpg";

function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="photo-container">
        <img src={photo1} alt="Photo 1" className="photo1" />
        <img src={photo2} alt="Photo 2" className="photo2" />
      </div>
      <div className="skew-container">
        <div id="skew" />
        <div className="skew" />
      </div>
      <div className="about-me-text">
        <h2>About Me</h2>
        <p>I am a litigation lawyer and business consultant with a passion for helping clients navigate complex legal and
          business challenges. My unique background in both law and business enables me to provide clients with a
          well-rounded perspective and innovative solutions.</p>
      </div>
    </div>
  );
}

export default AboutMe;
