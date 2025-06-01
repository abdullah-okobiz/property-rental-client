"use client";
import { monthsList, yearList } from "@/utilits/months";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
const EarningPage = () => {
  const [loading] = useState(false);
  return (
    <div className="mt-8">
      <div className="flex lg:flex-nowrap flex-wrap items-center justify-center gap-2">
        <div className="w-full  flex gap-2  border border-[#262626]/30  hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded px-2 py-3">
          <label htmlFor="type" className="font-medium">
            From:
          </label>
          <select
            name="type"
            id="type"
            className="w-full outline-none bg-[#fff] text-sm"
            // value={categoryId}
            // onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a Months</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              monthsList?.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.month}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="w-full  flex gap-2  border border-[#262626]/30  hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded px-2 py-3">
          <label htmlFor="type" className="font-medium">
            Year:
          </label>
          <select
            name="type"
            id="type"
            className="w-full outline-none bg-[#fff] text-sm"
            // value={categoryId}
            // onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a Year</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              yearList.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="w-full  flex gap-2  border border-[#262626]/30  hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded px-2 py-3">
          <label htmlFor="type" className="font-medium">
            To:
          </label>
          <select
            name="type"
            id="type"
            className="w-full outline-none bg-[#fff] text-sm"
            // value={categoryId}
            // onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a Month</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              monthsList?.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.month}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="w-full  flex gap-2  border border-[#262626]/30  hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded px-2 py-3">
          <label htmlFor="type" className="font-medium">
            Year:
          </label>
          <select
            name="type"
            id="type"
            className="w-full outline-none bg-[#fff] text-sm"
            // value={categoryId}
            // onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a Year</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              yearList.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="bg-[#F7F7F7] flex flex-col gap-2 items-center justify-center rounded py-12 mt-12">
        <p className="text-2xl">
          <FiEdit />
        </p>
        <p className="text-sm mt-2">You have no earnings.</p>
      </div>
    </div>
  );
};

export default EarningPage;
