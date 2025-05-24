"use client";
import { TFloorPlan } from "@/types";
// import React, { useState } from "react";
import Cleander from "../Cleander/Cleander";
import Reserve from "../Reserve/Reserve";
// import { addDays } from "date-fns";
import { useDateRange } from "@/contexts/DateRangeContext";

interface Props {
  title: string;
  slug: string;
  price: number;
  floorPlan:TFloorPlan
}
const CleanderAndResever: React.FC<Props> = ({ title, slug, price,floorPlan }) => {
  const { dateRange, setDateRange } = useDateRange();
  const { startDate, endDate } = dateRange;
  const numberOfNights =
    startDate && endDate
      ? (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      : 1;
  return (
    <div className="md:mt-20 mt-2 flex flex-wrap">
      <div className="lg:w-2/3 w-full">
        <Cleander
          dateRange={dateRange}
          setDateRange={setDateRange}
          title={title}
          numberOfNights={numberOfNights}
        />
      </div>
      <div className="lg:w-1/3 w-full">
        <div className="sticky top-0">
          <Reserve
            dateRange={dateRange}
            setDateRange={setDateRange}
            numberOfNights={numberOfNights}
            slug={slug}
            price={price}
            floorPlan={floorPlan}
           
          />
        </div>
      </div>
    </div>
  );
};

export default CleanderAndResever;
