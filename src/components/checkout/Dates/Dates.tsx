'use client';
import { poppins } from "@/app/font";
import DatesModel from "@/components/modals/DatesModel";
import React, { useState } from "react";

const Dates = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between border-b pb-6 border-[#262626]/30 ${poppins.className}`}
      >
        <div>
          <h2 className="font-medium">Dates</h2>
          <p className="text-[#262626]/60 text-sm">Jun 08 - 18</p>
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
