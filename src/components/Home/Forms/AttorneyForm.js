import React, { useState } from 'react';

const AttorneyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Submitted:', { title, description });
    // Reset form fields
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Attorney Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Attorney Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AttorneyForm;
