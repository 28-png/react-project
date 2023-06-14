import { useState, useEffect } from "react";
import Axios from "axios";
import SlideOverLayer from './SlideOverLayer';
import BackgroundLayer from './Background';
import FadeIn from './FadeIn';
import Button from './Button';

function LegalContent({show, setShow}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/services").then((response) => {
      setServices(response.data);
    });
  }, []);

    return (
        <div>
            
            <BackgroundLayer />
                <SlideOverLayer>
              <FadeIn delay="delay-[0ms]">
                
              {services.map((service) => (
                <div>
                  <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {service.legalLiTitle}
                  </p>
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  {JSON.parse(service.legalList).map((item, index) => (
                    <li key={`${service._id}-${item}-${index}`}>{item}</li>
                  ))}
                  </ul>
                </div>
              ))}
              </FadeIn>
              <FadeIn delay="delay-[300ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We also have experience participating in these forums:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Department of Labor Relations</li>
                <li>Mediations</li>
                <li>Arbitrations</li>
                <li>Settlement Conferences</li>
              </ul>
              </FadeIn>
              <FadeIn delay="delay-[500ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We are always looking to expand our practice areas. But currently, we do not practice:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Family Law</li>
                <li>Criminal Law</li>
                <li>Trusts &amp; Estates</li>
              </ul>
              </FadeIn>
              <div className="my-6">
            <FadeIn delay="delay-[900ms]">
              <Button onClick={() => setShow(false)}>Close</Button>
            </FadeIn>
          </div>
              </SlideOverLayer>
        </div>
    );
}

export default LegalContent;