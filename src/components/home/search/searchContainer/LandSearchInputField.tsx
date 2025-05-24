"use client";
import RentSearchModel from "@/components/modals/RentSearchModel";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { VscLocation } from "react-icons/vsc";

const LandSearchInputField = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <form className="w-full p-4 bg-white shadow-sm rounded-md">
      <div className="lg:hidden flex items-center justify-between group">
        <p
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 font-medium sm:text-base text-[13px] text-[#262626]/40"
        >
          <span className="text-primary">
            <VscLocation />
          </span>{" "}
          <span>Search for the land you want !</span>
        </p>
        <p
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 text-[#262626]/50 uppercase font-medium group-hover:text-primary duration-300"
        >
          <span>
            <GoSearch />
          </span>
          <span className="tracking-wide cursor-pointer">Search</span>
        </p>
      </div>
      <div className="lg:flex hidden flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1 tracking-wide"
          >
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
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
      {openModal && <RentSearchModel onClose={() => setOpenModal(false)} />}
    </form>
  );
};

export default LandSearchInputField;
