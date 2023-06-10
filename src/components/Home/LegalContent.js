import { Transition } from '@headlessui/react';
import SlideOverLayer from './SlideOverLayer';
import BackgroundLayer from './Background';
import FadeIn from './FadeIn';
import Button from './Button';

function LegalContent({show, setShow}) {

    return (
        <div>
            
            <BackgroundLayer />
                <SlideOverLayer>
              <FadeIn delay="delay-[0ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Our practice areas include:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Federal Products Liability Litigation</li>
                <li>Federal Civil Rights Law</li>
                <li>Labor and Employment</li>
              </ul>
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