import { Transition } from '@headlessui/react';
import React, { useState, useEffect } from "react";
import "./Services.css";
import photo3 from "../../assets/landingpagephoto1.jpg";
import SlideOverLayer from './SlideOverLayer';
import BackgroundLayer from './Background';
import FadeIn from './FadeIn';
import Button from './Button';

function Contract() {
    const [show, setShow] = useState(false);


    return (

        <div>
            <div className={"service-header service-item"}>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={photo3} alt="" />
        <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contract Review</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">NCL Consulting LLC provides contract negotiation services to assist clients in achieving favorable terms and conditions in their 
        contracts with other parties. We also provide contract drafting and review services.</p>
              </div>
              <div className="p-5">
              <Transition.Root show={show}>
                <BackgroundLayer />
                <SlideOverLayer>
              <FadeIn delay="delay-[0ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We can assist your business in the following areas:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Employment Contracts</li>
                <li>Technology Contracts</li>
                <li>Non-disclosure Agreements (NDA)</li>
                <li>Liability Waivers</li>
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
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Button>
              </div>
          </div>
    </div>
    </div>);
}

export default Contract;