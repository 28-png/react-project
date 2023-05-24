import React from "react";
import AboutMe from './AboutMe';
import './Services.css';

function Services() {
  return (
    <div>
      <main>
        <section className="hero">
          <div className="container">
            <h1>Lawyer and Business Consultation Services</h1>
            <p>We provide legal and business consultation services to help individuals and companies make informed decisions.</p>
            <button>Learn More</button>
          </div>
        </section>

        <div className="mission-container">
          <h2>Our Mission</h2>
          <p>Our firm values the attorney-client relationship. We believe in transparency and honesty so that our clients feel empowered when making decisions. We believe in educating our clients on the pros and cons of their business or legal issue. We believe in being overly communicative to avoid miscommunication. We believe in working closely with clients to mitigate risks and create optimal solutions. Overall, we aim to provide a safe space where our clients feel heard, seen, and understood.</p>
        </div>

        <AboutMe />

        <section className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="service-items">
              <div className="service-item">
                <h3>Legal Consultation</h3>
                <p>Our practice areas include:</p>
                <ul>
                  <li>Federal Products Liability Litigation</li>
                  <li>Federal Civil Rights Law</li>
                  <li>Labor and Employment</li>
                </ul>
              </div>
              <div className="service-item">
                <h3>Business Consultation</h3>
                <p>We provide business consultation services to help individuals and companies make informed decisions about their business operations.</p>
              </div>
              <div className="service-item">
                <h3>Contract Review</h3>
                <p>We provide contract review services to help individuals and companies understand the terms and conditions of their contracts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Services;
