import { useState, useEffect } from "react";
import Axios from "axios";
import AboutUs from "./AboutUs";
import "./Services.css";
import Legal from "./Legal";
import Business from "./Business";
import Contract from "./Contract";
import AttorneyProfile from "./AttorneyProfile";
import TestimonialForm from "./TestimonialForm";
import TestimonialSection from "./TestimonialSection";

function Services() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setAbout(response.data);
    });
  }, []);
  

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    servicesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <main>
        <section className="hero">
          <div className="container">
            <h1>Lawyer and Business Consultation Services</h1>
            <p>We provide legal and business consultation services to help individuals and companies make informed decisions.</p>
            <button onClick={scrollToServices}>Learn More</button>
          </div>
        </section>

        <div className="mission-container">
        {about.map((about) => {
          return (
            <div>
              <h2>{about.title}</h2>
              <p>{about.body}</p>
            </div>
          );
        })}
        </div>

        <AboutUs />
        <AttorneyProfile />
        <section id="services-section" className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="service-items">
            <Legal />
            <Business />
            <Contract />
            </div>
          </div>
          </section>
      </main>
      <TestimonialSection />
      <TestimonialForm />
    </div>
  );
}

export default Services;
