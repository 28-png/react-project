import { useState, useEffect } from "react";
import Axios from "axios";
import SlideOverLayer from '../Animations/SlideOverLayer';
import BackgroundLayer from '../Reusable-Assets/Background';
import FadeIn from '../Animations/FadeIn';
import Button from '../Reusable-Assets/Button';

function LegalContentNav({show, setShow}) {
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
                {services.map((service) => (
                    <div key={service._id}>
                <FadeIn delay="delay-[0ms]">
                <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">{service.legalHeader}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.legalBody}</p>
              </div>
                </FadeIn>
              <FadeIn delay="delay-[300ms]">
                  {service.legalAreas.map((area) => (
                <div key={area.title}>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-600">{area.title}</p>
              <ul className="flex-col max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {area.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
              </ul>
              </div>
                ))}
              </FadeIn>
              <div className="my-6">
            <FadeIn delay="delay-[900ms]">
              <Button onClick={() => setShow(false)}>Close</Button>
            </FadeIn>
          </div>
          </div>
              ))}
              </SlideOverLayer>
        </div>
    );
}

export default LegalContentNav;