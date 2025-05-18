"use client";
import React, { useState } from "react";
import Cleander from "../Cleander/Cleander";
import Reserve from "../Reserve/Reserve";
import { addDays } from "date-fns";
const CleanderAndResever = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(),
    endDate: addDays(new Date(), 0),
  });
  return (
    <div className="mt-20 flex">
      <div className="w-2/3">
        <Cleander dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className="w-1/3">
        <div className="sticky top-0">
          <Reserve dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
    </div>
  );
};

export default CleanderAndResever;
