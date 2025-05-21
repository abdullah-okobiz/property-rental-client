"use client";
import { poppins } from "@/app/font";
import DatesModel from "@/components/modals/DatesModel";
import { useDateRange } from "@/contexts/DateRangeContext";
import { format } from "date-fns";
import React, { useState } from "react";

const Dates = () => {
  const [openModal, setOpenModal] = useState(false);
  const { dateRange } = useDateRange();
  const { startDate, endDate } = dateRange;
  return (
    <div>
      <div
        className={`flex justify-between border-b pb-6 border-[#262626]/30 ${poppins.className}`}
      >
        <div>
          <h2 className="font-medium">Dates</h2>
          <p>
            {startDate ? format(startDate, "MMM d, yyyy") : "No start date"} -{" "}
            {endDate ? format(endDate, "MMM d, yyyy") : "No end date"}
          </p>
        </div>
        <div>
          <p
            className="font-medium underline cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            Edit
          </p>
        </div>
      </div>

      {openModal && <DatesModel onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default Dates;
