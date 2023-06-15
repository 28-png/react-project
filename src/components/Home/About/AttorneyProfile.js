import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";
import photo from '../../../assets/lawyer-img.jpg'
function AttorneyProfile() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setAbout(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {about.map((aboutData) => {
            return (
              <div key={aboutData._id}>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {aboutData.profileTitle}
                </h2>
                <p className="mt-4 text-gray-500">{aboutData.profileBody}</p>
              </div>
            );
          })}
          <div className="mt-12 lg:mt-0">
            <div className="max-w-md mx-auto sm:max-w-lg lg:ml-auto lg:max-w-none lg:w-96">
              <div className="aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img className="object-cover" src={photo} alt="Attorney Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AttorneyProfile;
