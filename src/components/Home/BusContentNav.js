import SlideOverLayer from './SlideOverLayer';
import BackgroundLayer from './Background';
import FadeIn from './FadeIn';
import Button from './Button';


function BusContentNav({showBus, setShowBus}) {
    return (
        <div>
            <BackgroundLayer />
                <SlideOverLayer>
            <FadeIn delay="delay-[0ms]">
            <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Business Consultation</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">We are passionate about assisting clients and businesses with their growth and expansion. 
        We are here to provide legal expertise and guidance on legal issues related to business.</p>
              </div>
            </FadeIn>
              <FadeIn delay="delay-[300ms]">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">We can assist your business in the following areas:</p>
              <ul className="flex-col max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>Regulatory Compliance</li>
                <li>Risk management</li>
                <li>Business Structuring</li>
                <li>Business Contracts</li>
                <li>Restructuring of Business Operations</li>
                <li>Intellectual Property Protection</li>
              </ul>
              </FadeIn>
              <div className="my-6">
            <FadeIn delay="delay-[300ms]">
              <Button onClick={() => setShowBus(false)}>Close</Button>
            </FadeIn>
        </div>
        </SlideOverLayer>
        </div>
        
    );
}

export default BusContentNav;