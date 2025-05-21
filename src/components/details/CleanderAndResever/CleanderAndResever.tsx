"use client";
// import React, { useState } from "react";
import Cleander from "../Cleander/Cleander";
import Reserve from "../Reserve/Reserve";
// import { addDays } from "date-fns";
import { useDateRange } from "@/contexts/DateRangeContext";

interface Props {
  title: string;
  slug: string;
}
const CleanderAndResever: React.FC<Props> = ({ title,slug }) => {
  // const [dateRange, setDateRange] = useState<{
  //   startDate: Date | undefined;
  //   endDate: Date | undefined;
  // }>({
  //   startDate: new Date(),
  //   endDate: addDays(new Date(), 0),
  // });
  const { dateRange, setDateRange } = useDateRange();
  return (
    <div className="md:mt-20 mt-2 flex flex-wrap">
      <div className="lg:w-2/3 w-full">
        <Cleander
          dateRange={dateRange}
          setDateRange={setDateRange}
          title={title}
        />
      </div>
      <div className="lg:w-1/3 w-full">
        <div className="sticky top-0">
          <Reserve dateRange={dateRange} setDateRange={setDateRange} slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default CleanderAndResever;
