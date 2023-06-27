import { useState, useEffect } from "react";
import Axios from "axios";

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/Testimony").then((response) => {
      setTestimonials(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Client Testimonials
          </h2>
          <p className="mt-4 text-gray-500">
            Here's what our clients have to say about our services.
          </p>
        </div>
        <div className="mt-16">
          <div className="max-w-lg mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimony) => (
              <div
                key={testimony._id}
                className="rounded-lg shadow-lg bg-white overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                {testimony.testimonies.map((area) => (
                  <div key={area.testimonyId}>
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-gray-500">{area.description}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      {area.name}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-500 px-6 py-4">
                  <div className="flex justify-between items-center">
                    {/* <div>
                      <p className="text-sm font-medium text-white">
                        {area.name}
                      </p>
                    </div> */}
                  </div>
                </div>
                </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
