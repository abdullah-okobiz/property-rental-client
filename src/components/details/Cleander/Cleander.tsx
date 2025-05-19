"use client";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Cleander/Cleander.css";
import { format } from "date-fns";

interface CleanderProps {
  dateRange: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  setDateRange: (range: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
  title: string;
}

const Cleander: React.FC<CleanderProps> = ({
  dateRange,
  setDateRange,
  title,
}) => {
  const { startDate, endDate } = dateRange;

  const numberOfNights =
    startDate && endDate
      ? (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      : 0;

  return (
    <div className="overflow-x-hidden py-6 border-b border-[#262626]/30 pb-12 lg:w-[90%]">
      <h2 className="text-xl font-medium">
        <span>{(numberOfNights ?? 0).toFixed(0)} nights in</span>{" "}
        <span>{title}</span>
      </h2>
      <p className="mt-1 text-[#262626]/60 text-sm font-medium">
        Arrival Date - Leaving Date
      </p>
      <p className="mt-1 text-[#262626]/60 text-sm font-medium">
        {startDate ? format(startDate, "MMM d, yyyy") : "Select a start date"} -{" "}
        {endDate ? format(endDate, "MMM d, yyyy") : "Select an end date"}
      </p>

      <div className="mt-8 w-full">
        <div className="w-full date-range-wrapper">
          <DateRangePicker
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              setDateRange({ startDate, endDate });
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
