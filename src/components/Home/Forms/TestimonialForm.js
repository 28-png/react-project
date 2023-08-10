import React, { useState, useEffect } from "react";
import axios from "axios";

function TestimonialForm() {
    const [testimonies, setTestimonies] = useState([]);    
    const [updatedClientName, setClientName] = useState("");
    const [updatedTestimonyDescription, setTestimonyDescription] = useState("");
    const [newClientName, setNewClientName] = useState(""); // State for new testimonial
    const [newTestimonyDescription, setNewTestimonyDescription] = useState(""); // State for new testimonial

    useEffect(() => {
      fetchTestimony();
    }, []);
  
    const fetchTestimony = () => {
      axios.get("http://localhost:3001/Testimonials").then((response) => {
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

    const handleDeleteTestimonial = (testimonyId) => {
      axios
        .delete(`http://localhost:3001/Testimonials/delete/${testimonyId}`)
        .then((response) => {
          console.log("Testimonial deleted successfully");
          const updatedTestimonies = testimonies.filter(testimony =>
            !testimony.testimonies.some(area => area.testimonyId === testimonyId)
          );
          setTestimonies(updatedTestimonies);
        })
        .catch((error) => {
          console.error("Error deleting testimonial:", error);
        });
    };

    const handleAddTestimonial = () => {
      axios
        .post(`http://localhost:3001/Testimonials/add`, {
          name: newClientName,
          description: newTestimonyDescription,
        })
        .then((response) => {
          console.log("Testimonial added successfully");
          const updatedTestimonies = [...testimonies];
  
          const updatedTestimony = updatedTestimonies.find(testimony =>
            testimony.testimonies.some(area => area.testimonyId === response.data.newTestimonial.testimonyId)
          );
  
          if (updatedTestimony) {
            updatedTestimony.testimonies.push(response.data.newTestimonial);
          } else {
            updatedTestimonies.push({
              testimonyId: response.data.newTestimonial.testimonyId,
              testimonies: [response.data.newTestimonial]
            });
          }
  
          setTestimonies(updatedTestimonies);
  
          setNewClientName("");
          setNewTestimonyDescription("");
        })
        .catch((error) => {
          console.error("Error adding testimonial:", error);
        });
    };
    

const updateClientName = (testimonyId, updatedClientName) => {
  axios
    .put(`http://localhost:3001/Testimonials/${testimonyId}`, {
      name: updatedClientName,
    })
    .then(() => {
      console.log("Client name updated successfully");
      // Update local state here
      const updatedTestimonies = [...testimonies];
      const testimonyIndex = updatedTestimonies.findIndex(testimony => testimony.testimonies.some(area => area.testimonyId === testimonyId));
      if (testimonyIndex !== -1) {
        const areaIndex = updatedTestimonies[testimonyIndex].testimonies.findIndex(area => area.testimonyId === testimonyId);
        updatedTestimonies[testimonyIndex].testimonies[areaIndex].name = updatedClientName;
        setTestimonies(updatedTestimonies);
      }
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
      // Update local state here
      const updatedTestimonies = [...testimonies];
      const testimonyIndex = updatedTestimonies.findIndex(testimony => testimony.testimonies.some(area => area.testimonyId === testimonyId));
      if (testimonyIndex !== -1) {
        const areaIndex = updatedTestimonies[testimonyIndex].testimonies.findIndex(area => area.testimonyId === testimonyId);
        updatedTestimonies[testimonyIndex].testimonies[areaIndex].description = updatedTestimonyDescription;
        setTestimonies(updatedTestimonies);
      }
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

    return (
        <div>
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
     
        {testimonies.map((testimony) => (
  <div key={testimony._id} className="bg-gray-100 py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-16">
        {testimony.testimonies.map((area) => (
          <div key={area.testimonyId} className="rounded-lg shadow-lg bg-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 p-6">
                Update/Delete Client Testimonial
              </h2>
            </div>
            <div className="p-6 m-10">
              <p className="text-gray-500 text-center">{area.description}</p>
              <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                <textarea 
                  type="text"
                  value={updatedTestimonyDescription}
                  onChange={handleDescriptionChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  onClick={() => updateTestimonyDescription(area.testimonyId, updatedTestimonyDescription)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Submit
                </button>
              </form>
              <p className="text-lg font-medium text-gray-900 text-center">
                {area.name}
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                <div className="flex justify-end mt-4">
                  <input 
                    type="text"
                    value={updatedClientName}
                    onChange={handleClientNameChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => updateClientName(area.testimonyId, updatedClientName)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Submit
                </button>
              </form>
              <button
                type="button"
                onClick={() => handleDeleteTestimonial(area.testimonyId)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Delete Testimonial
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
))}


      </div>
    )
}

export default TestimonialForm;