"use client";
import { DatePicker } from "antd";
import { VscLocation } from "react-icons/vsc";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import RentSearchModel from "@/components/modals/RentSearchModel";
const RentSearchInputField = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <form className="w-full p-4 bg-white shadow-sm rounded-md">
        <div className="lg:hidden flex items-center justify-between group">
          <p
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-1 font-medium sm:text-base text-[13px] text-[#262626]/40"
          >
            <span className="text-primary">
              <VscLocation />
            </span>{" "}
            <span>Search for the location you want !</span>
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
        <div className="lg:flex flex-col md:flex-row items-center gap-4 hidden">
          <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
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
              placeholder="Search Destinations"
              className="w-full px-4 py-2 border-0 rounded-md focus:outline-none bg-[#F5F5F5]"
            />
          </div>

          <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <DatePicker
              className="w-full bg-[#F5F5F5] border-0 focus:outline-none"
              placeholder="Select date"
              format="YYYY-MM-DD"
              style={{ border: "none" }}
            />
          </div>

          <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md p-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <DatePicker
              className="w-full bg-[#F5F5F5] border-0 focus:outline-none"
              placeholder="Select date"
              format="YYYY-MM-DD"
              style={{ border: "none" }}
            />
          </div>

          <div className="w-full md:w-1/4 bg-[#F5F5F5] border border-transparent hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-2">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Guest
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

      {openModal && <RentSearchModel onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default RentSearchInputField;
