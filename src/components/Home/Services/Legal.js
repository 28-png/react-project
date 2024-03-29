import { useState, useEffect } from "react";
import Axios from "axios";
import { Transition } from '@headlessui/react';
import "./Services.css";
import photo1 from "../../../assets/lawyer-img.jpg";
import Button from '../Reusable-Assets/Button';
import LegalContent from './LegalContent';
function Legal() {
    const [show, setShow] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
      Axios.get("http://localhost:3001/services").then((response) => {
        setServices(response.data);
      });
    }, []);

    return (
        <div>
            <div className={"service-header service-item"}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {services.map((service) => (
                    <div key={service._id}>
                    <img className="rounded-t-lg" src={photo1} alt="" />
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{service.legalHeader}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.legalBody}</p>
                    </div>
                    </div>
                    ))}
                    <div className="p-5">
                        <Transition.Root key="legal-transition" show={show}>
                            <LegalContent setShow={setShow} />
                        </Transition.Root>
                        <Button onClick={() => setShow(!show)}>
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Legal;
