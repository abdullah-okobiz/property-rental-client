"use client";
import React from "react";

const LandSearchInputField = () => {
    return (
        <form className="w-full p-4 bg-white shadow-sm rounded-md">
            <div className="flex flex-col md:flex-row items-center gap-4">

                <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 tracking-wide">
                        Where do you want to stay?
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter location"
                        className="w-full px-4 py-2 border-0 rounded-md focus:outline-none "
                    />
                </div>

                <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Enter max price"
                        className="w-full px-4 py-2 border-0 rounded-md focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                </div>

                <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="type"
                        id="type"
                        className="w-full px-4 py-2 border-0 rounded-md bg-[#F5F5F5] focus:outline-none"
                    >
                        <option value="">Select type</option>
                        <option value="studio">Studio</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                    </select>
                </div>

                <div className="w-full md:w-auto flex items-end h-full ">
                    <button
                        type="submit"
                        className="w-full md:w-auto cursor-pointer px-6 md:py-[25px] bg-primary font-extrabold !text-white rounded-md hover:bg-primary/90 transition"
                    >
                        Search
                    </button>
                </div>

            </div>
        </form>
    );
};

export default LandSearchInputField;
