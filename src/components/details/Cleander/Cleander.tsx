"use client";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Cleander/Cleander.css";
import { format } from "date-fns";
const Cleander = ({ dateRange, setDateRange }) => {
  console.log("recive data", dateRange);

  const numberOfNights =
    (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
    (1000 * 3600 * 24);

  return (
    <div className="overflow-x-hidden">
      <h2 className="text-xl font-medium">
        <span>{numberOfNights}</span> nights in{" "}
        <span>Cozy Non-ac room at Mugda</span>
      </h2>
      <p className="mt-1 text-[#262626]/60 text-sm font-medium">
        Arrival Date - Leaving Date
      </p>
      <p className="mt-1 text-[#262626]/60 text-sm font-medium">
        {format(dateRange.startDate, "MMM d, yyyy")} -{" "}
        {format(dateRange.endDate, "MMM d, yyyy")}
      </p>

      <div className="mt-8 w-full">
        <div className="w-full date-range-wrapper">
          <DateRangePicker
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              setDateRange({ startDate, endDate });
              console.log("Start Date:", startDate);
              console.log("End Date:", endDate);
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[{ ...dateRange, key: "selection" }]}
            direction="horizontal"
            preventSnapRefocus={true}
            staticRanges={[]}
            inputRanges={[]}
            className="w-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Cleander;
