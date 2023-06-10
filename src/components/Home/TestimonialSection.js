import React from "react";

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur dui nec finibus aliquam. Phasellus fermentum risus a eros euismod, id facilisis ligula tincidunt.",
    },
    {
      id: 2,
      name: "Jane Smith",
      testimonial:
        "Pellentesque feugiat ante vitae ante congue, ut blandit est commodo. Integer accumsan vestibulum ipsum, et suscipit arcu consequat a.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      testimonial:
        "Nullam nec sem nec risus rutrum fringilla. Maecenas et mi in tortor scelerisque fringilla. Curabitur at erat consectetur, vulputate ligula et, aliquet turpis.",
    },
  ];

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
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-lg shadow-lg bg-white overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-gray-500">{testimonial.testimonial}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <p className="text-sm font-medium text-white">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-500 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
