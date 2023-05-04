import './App.css';
import Navbar from './components/Navbar'
import AboutMe from './components/AboutMe'

function App() {

  return (
    <div className="App">
      <Navbar/>
      
      <main>
        <section className="hero">
          <div className="container">
            <h1>Lawyer and Business Consultation Services</h1>
            <p>We provide legal and business consultation services to help individuals and companies make informed decisions.</p>
            <button>Learn More</button>
          </div>
        </section>
        <AboutMe/>
        <section className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="service-items">
              <div className="service-item">
                <h3>Legal Consultation</h3>
                <p>We provide legal consultation services to help individuals and companies understand their legal rights and obligations.</p>
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
     
    </div>);
}

export default App;
