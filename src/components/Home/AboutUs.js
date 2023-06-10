import React from "react";
import "./AboutMe.css";
import photo1 from "../../assets/lawyer-img.jpg";
import photo2 from "../../assets/lawyer-image3.jpg";

function AboutUs() {
  return (
    <div className="about-me-container">
      <div className="photo-container">
        <img src={photo1} alt="Photo 1" className="photo1" />
        <img src={photo2} alt="Photo 2" className="photo2" />
        <div className="about-me-text">
        <h2>About Us</h2>
        <p>NCL Consulting LLC provides business consulting, contract review and drafting, and civil litigation services. 
          Since our firm operates within the business and legal spheres we provide our clients with a well-rounded perspective 
          on their business or legal issue. Our primary goal is to provide risk management to our clients. We strive to minimize 
          our clients legal risks and legal exposure. We are also a firm that zealously advocates on our clients behalf. 
          We service clients across the United States and international businesses incorporated in the United States.</p>
      </div>
      </div>
      <div className="skew-container">
        <div id="skew2" />
        <div className="skew2" />
      </div>
    </div>
  );
}

export default AboutUs;
