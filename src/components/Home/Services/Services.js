import { useState, useEffect } from "react";
import Axios from "axios";
import AboutUs from "../About/AboutUs";
import "./Services.css";
import Legal from "./Legal";
import Business from "./Business";
import Contract from "./Contract";
import AttorneyProfile from "../About/AttorneyProfile";
import TestimonialForm from "../Testimonial/TestimonialForm";
import TestimonialSection from "../Testimonial/TestimonialSection";
import LandingForm from "../Forms/LandingForm";
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../../ContactAndServer/RequireAuth';
import useAuth from '../../ContactAndServer/UseAuth';
import MissionForm from "../Forms/MissionForm";
import CardForm from "../Forms/CardForm";

function Services() {
  const [about, setAbout] = useState([]);
  const { auth } = useAuth();

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
          <Routes>
            <Route element={<RequireAuth isAdmin={true} />}>
              <Route element={<LandingForm />} path="Admin/Dashboard" />
            </Route>
          </Routes>
          {!auth.user && (
            <>
              {about.map((aboutItem) => (
                <div key={aboutItem._id}>
                  <h1>{aboutItem.landingTitle}</h1>
                  <p>{aboutItem.landingBody}</p>
                </div>
              ))}
              <button onClick={scrollToServices}>Learn More</button>
            </>
          )}
          </div>
        </section>
        <div className="mission-container">
        <Routes>
            <Route element={<RequireAuth isAdmin={true} />}>
              <Route element={<MissionForm />} path="Admin/Dashboard" />
            </Route>
          </Routes>
          {!auth.user && (
            <>
          {about.map((aboutItem) => (
            <div key={aboutItem._id}>
              <h2>{aboutItem.missionTitle}</h2>
              <p>{aboutItem.missionBody}</p>
            </div>
          ))}
           </>
         )}
        </div>
        <AboutUs key="about-us" />
        <AttorneyProfile key="attorney-profile" />
        <section id="services-section" className="services">
          <div className="container">
          {!auth.user && (
            <>
            <h2>Our Services</h2>
            <div className="service-items">
              <Legal key="legal" />
              <Business key="business" />
              <Contract key="contract" />
            </div>
            </>
         )}
            <Routes>
            <Route element={<RequireAuth isAdmin={true} />}>
              <Route element={<CardForm />} path="Admin/Dashboard" />
            </Route>
          </Routes>
          </div>
        </section>
      </main>
      <TestimonialSection key="testimonial-section" />
      <TestimonialForm key="testimonial-form" />
    </div>
  );
}

export default Services;
