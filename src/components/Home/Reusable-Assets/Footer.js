import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            &copy; {currentYear} NCL Consulting LLC. All rights reserved.
          </p>
          <p className="text-sm">
            Created with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
