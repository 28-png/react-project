import React, { useState, useEffect } from "react";
import axios from "axios";

function TestimonialForm() {
    const [testimonies, setTestimonies] = useState([]);    
    const [updatedClientName, setClientName] = useState("");
    const [updatedTestimonyDescription, setTestimonyDescription] = useState("");

    useEffect(() => {
      fetchTestimony();
    }, []);
    
    const fetchTestimony = () => {
      axios.get("http://localhost:3001/Testimonials")
        .then((response) => {
          console.log("API Response:", response.data);
          setTestimonies(response.data);
          if (response.data.length > 0) {
            setTestimonyDescription(response.data[0].testimonies[0].description);
            setClientName(response.data[0].testimonies[0].name);
          }
        })
        .catch((error) => {
          console.error("Error fetching testimonies:", error);
        });
    };
     

      const updateClientName = (testimonyId, updatedClientName) => {
        axios
          .put(`http://localhost:3001/Testimonials/${testimonyId}`, {
            name: updatedClientName,
          })
          .then(() => {
            console.log("Client name updated successfully");
            fetchTestimony(); // Refresh the services data after successful update
          })
          .catch((error) => {
            console.error("Error updating client name:", error);
          });
      };
    
      const updateTestimonyDescription = (testimonyId, updatedTestimonyDescription) => {
        axios
          .put(`http://localhost:3001/Testimonials/${testimonyId}`, {
            description: updatedTestimonyDescription,
          })
          .then(() => {
            console.log("Testimony description updated successfully");
            fetchTestimony(); // Refresh the services data after successful update
          })
          .catch((error) => {
            console.error("Error updating testimony description:", error);
          });
      };
    
      const handleClientNameChange = (e) => {
        setClientName(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setTestimonyDescription(e.target.value);
      };
    
      const handleClientNameSubmit = (testimonyId) => {
        updateClientName (testimonyId, updatedClientName);
      };
    
      const handleDescriptionSubmit = (testimonyId) => {
        updateTestimonyDescription(testimonyId, updatedTestimonyDescription);
      };      


    return (
        <div>
            {testimonies.map((testimony) => (
        <div key={testimony._id} className="bg-gray-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-16">
                <div className="rounded-lg shadow-lg bg-white">
                    <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 p-6">
              Update/Delete Client Testimonial
            </h2>
          </div>
                  {testimony.testimonies.map((area) => (
                    <div key={area.testimonyId}>
                  <div className="p-6">
                  <p className="text-gray-500">{area.description}</p>
                    <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                      <textarea 
                      type="text"
                      value={updatedTestimonyDescription}
                      onChange={handleDescriptionChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></textarea>
                      <button
                    type="submit"
                    onClick={() => handleDescriptionSubmit(area.testimonyId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit
                  </button>
                    </form>
                    
                    <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                    <p className="text-lg font-medium text-gray-900 text-center">
                      {area.name}
                    </p>
                    <div className="flex justify-end mt-4">
                      <input 
                      type="text"
                      value={updatedClientName}
                      onChange={handleClientNameChange}
                      className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                      </input>
                    </div>
                    <button
                    type="submit"
                    onClick={() => handleClientNameSubmit(area.testimonyId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit
                  </button>
                    </form>
                  </div>
                  </div>
                  ))}
                </div>
          </div>
          
        </div>
      </div>
      ))}
      </div>
    )
}

export default TestimonialForm;