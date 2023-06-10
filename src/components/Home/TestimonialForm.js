import React, { useState } from "react";

function TestimonialForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testimonial, setTestimonial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic here
    // You can send the form data to a server or handle it as per your requirements

    // Reset the form fields
    setName("");
    setEmail("");
    setTestimonial("");
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Submit a Testimonial
          </h2>
          <p className="mt-2 text-center text-gray-600">
            We would love your feedback. Please submit a testimonial. By doing so, you are granting NCL Consulting LLC permission to publish your testimonial in whole or in part on the firm’s website and social media.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="testimonial" className="sr-only">
                Testimonial
              </label>
              <textarea
                id="testimonial"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-2"
                placeholder="Testimonial"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestimonialForm;
