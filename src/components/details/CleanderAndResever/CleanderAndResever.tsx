"use client";
import React, { useState } from "react";
import Cleander from "../Cleander/Cleander";
import Reserve from "../Reserve/Reserve";
import { addDays } from "date-fns";
const CleanderAndResever = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 0),
  });
  return (
    <div className="mt-20">
      <Cleander dateRange={dateRange} setDateRange={setDateRange} />
      <Reserve dateRange={dateRange} setDateRange={setDateRange} />
    </div>
  );
};

export default CleanderAndResever;
