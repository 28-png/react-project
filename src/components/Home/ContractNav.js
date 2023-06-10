import SlideOverLayer from './SlideOverLayer';
import BackgroundLayer from './Background';
import FadeIn from './FadeIn';
import Button from './Button';

function ContractNav({showCont, setCont}) {

    return (
        <div>
            <BackgroundLayer />
                <SlideOverLayer>
            <FadeIn delay="delay-[0ms]">
            <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contract Review</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">NCL Consulting LLC provides contract negotiation services to assist clients in achieving favorable terms and conditions in their 
        contracts with other parties. We also provide contract drafting and review services.</p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-[300ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We can assist your business in the following areas:</p>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Employment Contracts</li>
                <li>Technology Contracts</li>
                <li>Non-disclosure Agreements (NDA)</li>
                <li>Liability Waivers</li>
              </ul>
              </FadeIn>
              <div className="my-6">
            <FadeIn delay="delay-[500ms]">
              <Button onClick={() => setCont(false)}>Close</Button>
            </FadeIn>
          </div>
            </SlideOverLayer>
        </div>
    );
}

export default ContractNav;