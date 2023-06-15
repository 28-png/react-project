import { useState, useEffect } from "react";
import Axios from "axios";
import { Transition } from '@headlessui/react';
import "./Services.css";
import photo2 from "../../../assets/lawyer-img-2.jpg";
import SlideOverLayer from '../Animations/SlideOverLayer';
import BackgroundLayer from '../Reusable-Assets/Background';
import FadeIn from '../Animations/FadeIn';
import Button from '../Reusable-Assets/Button';

function Business() {
    const [show, setShow] = useState(false);
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
            <div className={"service-header service-item"}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="rounded-t-lg" src={photo2} alt="" />
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service.busHeader}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.busBody}</p>
                    </div>
                    <div className="p-5">
                        <Transition.Root key="business-transition" show={show}>
                            <BackgroundLayer />
                            <SlideOverLayer>
                                <FadeIn delay="delay-[0ms]">
                                    <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{service.busTitle}</p>
                                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    {JSON.parse(service.busList).map((list) => (
                                        <li key={list}>{list}</li>
                                    ))}
                                    </ul>
                                </FadeIn>
                                <div className="my-6">
                                    <FadeIn delay="delay-[300ms]">
                                        <Button onClick={() => setShow(false)}>Close</Button>
                                    </FadeIn>
                                </div>
                                
                            </SlideOverLayer>
                        </Transition.Root>
                        <Button onClick={() => setShow(!show)} >
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
              ))}
            </div>
    );
}

export default Business;
