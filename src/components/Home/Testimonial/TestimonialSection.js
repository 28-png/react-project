import { useState, useEffect } from "react";
import Axios from "axios";

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/Testimonials")
      .then((response) => {
        console.log(response.data); // Check the structure of data received
        setTestimonials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
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
            {testimonials.map((testimony) =>
              testimony.testimonies.map((area) => (
                <div
                  key={area.testimonyId}
                  className="border rounded-lg bg-white shadow-md p-4"
                >
                  <p className="text-gray-500 mb-4">{area.description}</p>
                  <p className="text-sm font-medium text-gray-900">{area.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
