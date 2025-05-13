'use client';

import React, { useState } from 'react';

const VerificationPage = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-20">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Identity Verification</h2>
        
        <form className="space-y-4">
          {['NID', 'Passport', 'Identity Card'].map((option) => (
            <div key={option} className="flex items-center gap-3">
              <input
                type="radio"
                id={option}
                name="verification"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={option} className="text-gray-700">{option}</label>
            </div>
          ))}

          <button
            type="submit"
            className="cursor-pointer w-full mt-6 bg-primary text-white py-2 rounded-lg transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
