import React, { useState, useEffect } from "react";
import Axios from "axios";
import SlideOverLayer from '../Animations/SlideOverLayer';
import BackgroundLayer from '../Reusable-Assets/Background';
import FadeIn from '../Animations/FadeIn';
import Button from '../Reusable-Assets/Button';

function ContractNav({showCont, setCont}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/services").then((response) => {
      setServices(response.data);
    });
  }, []);

    return (
        <div>
            {services.map((service) => (
            <div key={service._id}>
            <BackgroundLayer />
                <SlideOverLayer>
            <FadeIn delay="delay-[0ms]">
            <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">{service.contHeader}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.contBody}</p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-[300ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-600">{service.contTitle}</p>
              <ul className="flex-col max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {JSON.parse(service.contList).map((list) => (
                  <li key={list}>{list}</li>
              ))}
              </ul>
              </FadeIn>
              <div className="my-6">
            <FadeIn delay="delay-[500ms]">
              <Button onClick={() => setCont(false)}>Close</Button>
            </FadeIn>
          </div>
            </SlideOverLayer>
            </div>
              ))}
        </div>
    );
}

export default ContractNav;