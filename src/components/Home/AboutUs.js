import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";
import "./AboutMe.css";
import photo1 from "../../assets/lawyer-img.jpg";
import photo2 from "../../assets/lawyer-image3.jpg";

function AboutUs() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setAbout(response.data);
    });
  }, []);

  return (
    <div className="about-me-container">
      <div className="photo-container">
        <img src={photo1} alt="Photo1" className="photo1" />
        <img src={photo2} alt="Photo2" className="photo2" />
        <div className="about-me-text">
        {about.map((about) => {
          return (
            <div>
              <h1>{about.aboutTitle}</h1>
              <p>{about.aboutBody}</p>
            </div>
          );
        })}
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
