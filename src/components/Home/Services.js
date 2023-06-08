import React, { useState, useEffect } from "react";
import AboutMe from "./AboutMe";
import "./Services.css";
import photo1 from "../../assets/lawyer-img.jpg";
import photo2 from "../../assets/lawyer-img-2.jpg";
import photo3 from "../../assets/landingpagephoto1.jpg"

function Services() {
  const [isLitConsultationExpanded, setIsLitConsultationExpanded] = useState(false);
  const [isBusConsultationExpanded, setIsBusConsultationExpanded] = useState(false);
  const [isContConsultationExpanded, setIsContConsultationExpanded] = useState(false);
  

  const handleLitConsultationClick = () => {
    setIsLitConsultationExpanded(!isLitConsultationExpanded);
  };
  const handleBusConsultationClick = () => {
    setIsBusConsultationExpanded(!isBusConsultationExpanded);
  };  
  const handleContConsultationClick = () => {
    setIsContConsultationExpanded(!isContConsultationExpanded);
  };

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
          <p>Our firm values the attorney-client relationship. We believe in transparency and honesty so that our clients feel empowered when making decisions. We believe in educating our clients on the pros and cons of their business or legal issue. We believe in being overly communicative to avoid miscommunication. We believe in working closely with clients to mitigate risks and create optimal solutions. Overall, we aim to provide a safe space where our clients feel heard, seen, and understood.</p>
        </div>

        <AboutMe />

          
        <section id="services-section" className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="service-items">
            <div className={`service-item ${isLitConsultationExpanded ? " expanded" : ""}`}>
            <div className="service-header">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={photo1} alt="" />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Legal Consultation</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We are a civil litigation firm. This means that we handle civil cases. We have experience
                litigating in state and federal court. And we have experience in Multidistrict Litigation (MDL).</p>
              </div>
              <div className="p-5">
                <div className="service-details">
                <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Our practice areas include:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Federal Products Liability Litigation</li>
                <li>Federal Civil Rights Law</li>
                <li>Labor and Employment</li>
              </ul>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We also have experience participating in these forums:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Department of Labor Relations</li>
                <li>Mediations</li>
                <li>Arbitrations</li>
                <li>Settlement Conferences</li>
              </ul>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We are always looking to expand our practice areas. But currently, we do not practice:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Family Law</li>
                <li>Criminal Law</li>
                <li>Trusts &amp; Estates</li>
              </ul>
              </div>
        <button onClick={handleLitConsultationClick} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    </div>
</div>
</div>

<div className={`service-item ${isBusConsultationExpanded ? " expanded" : ""}`}>
            <div className="service-header">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={photo2} alt="" />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Business Consultation</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We are passionate about assisting clients and businesses with their growth and expansion. 
        We are here to provide legal expertise and guidance on legal issues related to business.</p>
              </div>
              <div className="p-5">
                <div className="service-details">
                <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We can assist your business in the following areas:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Regulatory Compliance</li>
                <li>Risk management</li>
                <li>Business Structuring</li>
                <li>Business Contracts</li>
                <li>Restructuring of Business Operations</li>
                <li>Intellectual Property Protection</li>
              </ul>
              </div>
              </div>
        <button onClick={handleBusConsultationClick} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    </div>
</div>

<div className={`service-item ${isContConsultationExpanded ? " expanded" : ""}`}>
            <div className="service-header">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={photo3} alt="" />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contract Review</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">NCL Consulting LLC provides contract negotiation services to assist clients in achieving favorable terms and conditions in their 
        contracts with other parties. We also provide contract drafting and review services.</p>
              </div>
              <div className="p-5">
                <div className="service-details">
                <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We can assist your business in the following areas:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Employment Contracts</li>
                <li>Technology Contracts</li>
                <li>Non-disclosure Agreements (NDA)</li>
                <li>Liability Waivers</li>
              </ul>
              </div>
              </div>
        <button onClick={handleContConsultationClick} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    </div>
</div>
            </div>
          </div>
          </section>
      </main>
    </div>
  );
}

export default Services;
