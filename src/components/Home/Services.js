import React, { useState } from "react";
import AboutUs from "./AboutUs";
import "./Services.css";
import Legal from "./Legal";
import Business from "./Business";
import Contract from "./Contract";
import AttorneyProfile from "./AttorneyProfile";
import TestimonialForm from "./TestimonialForm";
import TestimonialSection from "./TestimonialSection";

function Services() {
  

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
          <h2>Our Mission</h2>
          <p>Our firm values the attorney-client relationship. We believe in transparency and honesty so that 
            our clients feel empowered when making decisions. We believe in educating our clients on the pros and cons 
            of their business or legal issue. We believe in being overly communicative to avoid miscommunication. 
            We believe in working closely with clients to mitigate risks and create optimal solutions. 
            Overall, we aim to provide a safe space where our clients feel heard, seen, and understood. </p>
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
