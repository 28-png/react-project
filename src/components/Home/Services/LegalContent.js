import { useState, useEffect } from "react";
import Axios from "axios";
import SlideOverLayer from '../Animations/SlideOverLayer';
import BackgroundLayer from '../Reusable-Assets/Background';
import FadeIn from '../Animations/FadeIn';
import Button from '../Reusable-Assets/Button';

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
                {services.map((service) => (
                <div key={service._id}>
              <FadeIn delay="delay-[0ms]">
              
                  <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {service.legalTitle}
                  </p>
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  {JSON.parse(service.legalList).map((list) => (
                    <li key={list}>{list}</li>
                  ))}
                  </ul>
              </FadeIn>
              <FadeIn delay="delay-[300ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{service.legalTitle2}</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {JSON.parse(service.legalList2).map((list2) => (
                <li key={list2}>{list2}</li>
                ))}
              </ul>
              </FadeIn>
              <FadeIn delay="delay-[500ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{service.legalTitle3}</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {JSON.parse(service.legalList3).map((list3) => (
                <li key={list3}>{list3}</li>
                ))}
              </ul>
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

export default LegalContent;