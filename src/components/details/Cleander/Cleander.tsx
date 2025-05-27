"use client";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Cleander/Cleander.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
  numberOfNights: number;
}

const Cleander: React.FC<CleanderProps> = ({
  dateRange,
  setDateRange,
  title,
  numberOfNights,
}) => {
  const { startDate, endDate } = dateRange;

  const [monthsToShow, setMonthsToShow] = useState(2);

  // Clear localStorage on first mount
  // useEffect(() => {
  //   localStorage.removeItem("startDate");
  //   localStorage.removeItem("endDate");
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth <= 768 ? 1 : 2);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-x-hidden py-6 border-b border-[#262626]/30 pb-12 lg:w-[90%]">
      <h2 className="md:text-xl text-base font-medium capitalize">
        {numberOfNights && <span>{numberOfNights.toFixed(0)} nights in </span>}
        <span>{title}</span>
      </h2>

      <p className="mt-1 text-[#262626]/60 text-sm font-medium">
        {startDate ? format(startDate, "MMM d, yyyy") : "Arrival Date"} -{" "}
        {endDate ? format(endDate, "MMM d, yyyy") : "Leaving Date"}
      </p>

      <div className="mt-8 w-full">
        <div className="w-full date-range-wrapper">
          <DateRangePicker
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              setDateRange({ startDate, endDate });
            }}
            moveRangeOnFirstSelection={false}
            months={monthsToShow}
            ranges={[{ ...dateRange, key: "selection" }]}
            direction="horizontal"
            preventSnapRefocus={true}
            staticRanges={[]}
            inputRanges={[]}
            className="lg:w-[60%] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cleander;
