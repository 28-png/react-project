import React, { useState, useEffect } from "react";
import AboutMe from "./AboutMe";
import "./Services.css";

function Services() {
  const [isLegalConsultationExpanded, setIsLegalConsultationExpanded] = useState(false);

  const handleLegalConsultationClick = () => {
    setIsLegalConsultationExpanded(!isLegalConsultationExpanded);
  };  

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    servicesSection.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsLegalConsultationExpanded(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <p>Our firm values the attorney-client relationship. We believe in transparency and honesty so that our clients feel empowered when making decisions. We believe in educating our clients on the pros and cons of their business or legal issue. We believe in being overly communicative to avoid miscommunication. We believe in working closely with clients to mitigate risks and create optimal solutions. Overall, we aim to provide a safe space where our clients feel heard, seen, and understood.</p>
        </div>

        <AboutMe />

        <section id="services-section" className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="service-items">
            <div className={`service-item${isLegalConsultationExpanded ? " expanded" : ""}`}>
            <div className="service-header" onClick={handleLegalConsultationClick}>
              <h3>Legal Consultation</h3>
              <p>Our practice areas include:</p>
              <ul>
                <li>Federal Products Liability Litigation</li>
                <li>Federal Civil Rights Law</li>
                <li>Labor and Employment</li>
              </ul>
            </div>
            <div className="service-details">
              <p>
                We are a civil litigation firm. This means that we handle civil cases. We have experience
                litigating in state and federal court. And we have experience in Multidistrict Litigation (MDL).
              </p>
              <p>We also have experience participating in these forums:</p>
              <ul>
                <li>Department of Labor Relations</li>
                <li>Mediations</li>
                <li>Arbitrations</li>
                <li>Settlement Conferences</li>
              </ul>
              <p>We are always looking to expand our practice areas. But currently, we do not practice:</p>
              <ul>
                <li>Family Law</li>
                <li>Criminal Law</li>
                <li>Trusts &amp; Estates</li>
              </ul>
            </div>
          </div>
              <div className="service-item">
                <h3>Business Consultation</h3>
                <p>We can assist your business in the following areas:</p>
                <ul>
                  <li>Regulatory Compliance</li>
                  <li>Risk management</li>
                  <li>Business Contracts</li>
                </ul>
              </div>
              <div className="service-item">
                <h3>Contract Review</h3>
                <p>
                  We review and draft an array of contracts including but not
                  limited to:
                </p>
                <ul>
                  <li>Employment Contracts</li>
                  <li>Technology Contracts</li>
                  <li>Non-disclosure Agreements (NDA)</li>
                  <li>Liability Waivers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Services;
