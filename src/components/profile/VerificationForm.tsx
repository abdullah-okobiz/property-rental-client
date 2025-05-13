"use client";

import React, { useState } from "react";

const VerificationForm = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFrontImageChange = (e) => {
    setFrontImage(e.target.files[0]);
  };

  const handleBackImageChange = (e) => {
    setBackImage(e.target.files[0]);
  };

  const handlePassportImageChange = (e) => {
    setPassportImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle form submission with all data
      console.log({
        documentType: selectedOption,
        frontImage,
        backImage,
        passportImage,
      });
      // You would typically send this data to your API here
    }
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-20">
      <div>
        {/* Stepper indicator */}
        {/* <div className="flex justify-between mb-6">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2">Document Type</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2">Upload</span>
          </div>
        </div> */}

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Identity Verification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {["NID", "Driving License", "Passport"].map((option) => (
                <div key={option} className="flex items-center gap-3">
                  <input
                    type="radio"
                    id={option}
                    name="verification"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    required
                  />
                  <label
                    htmlFor={option}
                    className="text-gray-700 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedOption !== "Passport" ? (
                <>
                  <div className="space-y-2">
                    <label className="block text-gray-700">Front Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFrontImageChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-700">Back Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackImageChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="block text-gray-700">Passport Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePassportImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    required
                  />
                </div>
              )}
            </>
          )}

          <div className="flex gap-4 mt-6">
            {step === 2 && (
              <button
                type="button"
                onClick={goBack}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors hover:bg-gray-300 cursor-pointer"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg transition-colors hover:bg-blue-700 cursor-pointer"
            >
              {step === 1 ? "Continue" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
