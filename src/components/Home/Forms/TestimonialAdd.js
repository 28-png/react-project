import React, { useState } from "react";
import axios from "axios";

function TestimonialAdd({ onTestimonialAdded }) {
  const [newClientName, setNewClientName] = useState("");
  const [newTestimonyDescription, setNewTestimonyDescription] = useState("");

  const handleAddTestimonial = () => {
    axios
      .post(`http://localhost:3001/Testimonials/add`, {
        name: newClientName,
        description: newTestimonyDescription,
      })
      .then((response) => {
        console.log("Testimonial added successfully");
        onTestimonialAdded(response.data.newTestimonial);
        setNewClientName("");
        setNewTestimonyDescription("");
      })
      .catch((error) => {
        console.error("Error adding testimonial:", error);
      });
  };

  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Add Testimonial</h3>
      <form onSubmit={(e) => e.preventDefault()} className="mb-2">
        <h2 className="text-lg font-medium text-gray-900 mb-2 text-center">Name</h2>
        <input
          type="text"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
        />
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="mb-2">
        <h2 className="text-lg font-medium text-gray-900 mb-2 text-center">Testimony</h2>
        <textarea
          type="text"
          value={newTestimonyDescription}
          onChange={(e) => setNewTestimonyDescription(e.target.value)}
        ></textarea>
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Add Testimonial
        </button>
      </form>
    </div>
  );
}

export default TestimonialAdd;
