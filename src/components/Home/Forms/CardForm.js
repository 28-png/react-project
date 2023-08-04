import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Services/Services.css";

function CardForm() {
  const [services, setServices] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios.get("http://localhost:3001/services").then((response) => {
      setServices(response.data);
      if (response.data.length > 0) {
        setUpdatedBody(response.data[0].businessBody);
      }

      if (response.data.length > 0) {
        setUpdatedTitle(response.data[0].businessHeader);
      }
    });
  };
  

  const updateServiceTitle = (_id, updatedTitle) => {
    axios
      .put(`http://localhost:3001/services/${_id}`, {
        businessHeader: updatedTitle,
      })
      .then(() => {
        console.log("Service title updated successfully");
        fetchServices(); // Refresh the services data after successful update
      })
      .catch((error) => {
        console.error("Error updating service title:", error);
      });
  };

  const updateServiceBody = (_id, updatedBody) => {
    axios
      .put(`http://localhost:3001/services/${_id}`, {
        businessBody: updatedBody,
      })
      .then(() => {
        console.log("Service Body updated successfully");
        fetchServices(); // Refresh the services data after successful update
      })
      .catch((error) => {
        console.error("Error updating service Body:", error);
      });
  };

  const handleTitleInputChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleBodyInputChange = (e) => {
    setUpdatedBody(e.target.value);
  };

  const handleTitleSubmit = (_id) => {
    updateServiceTitle(_id, updatedTitle);
    setUpdatedTitle("");
  };

  const handleBodySubmit = (_id) => {
    updateServiceBody(_id, updatedBody);
    setUpdatedBody("");
  };

  return (
    <div>
      {services.map((service) => (
        <div key={service._id} className="service-items">
          <div className={"service-header service-item"}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {service.businessHeader}
                </h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Update Title:
                </h5>
                <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={handleTitleInputChange}
                    className="text-xl font-semibold text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    onClick={() => handleTitleSubmit(service._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit
                  </button>
                </form>
                
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{service.businessBody}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Update Description:
                </h5>
                <form onSubmit={(e) => e.preventDefault()} className="mb-2">
                  <textarea
                    type="text"
                    value={updatedBody}
                    onChange={handleBodyInputChange}
                    className="text-xl font-semibold text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    onClick={() => handleBodySubmit(service._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardForm;