import { Transition } from '@headlessui/react';
import React, { useState } from "react";
import "./Services.css";
import photo1 from "../../assets/lawyer-img.jpg";
import Button from './Button';
import LegalContent from './LegalContent';

function Legal() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className={"service-header service-item"}>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={photo1} alt="" />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Legal Consultation</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We are a civil litigation firm. This means that we handle civil cases. We have experience
                litigating in state and federal court. And we have experience in Multidistrict Litigation (MDL).</p>
              </div>
              <div className="p-5">
              <Transition.Root show={show}>
                <LegalContent setShow={setShow} />
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

export default Legal;