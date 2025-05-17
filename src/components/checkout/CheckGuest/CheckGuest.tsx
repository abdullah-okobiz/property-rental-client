"use client";
import { poppins } from "@/app/font";
import CheckGuestsModel from "@/components/modals/CheckGuestsModel";
import { useState } from "react";
// import DatesModel from "@/components/modals/DatesModel";
// import React, { useState } from "react";

const CheckGuest = () => {
  const [openModal, setOpenModal] = useState(false);
  const [adults, setAdults] = useState(0);
  const [younger, setYounger] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalGuest = adults + younger + infants || 0;

  return (
    <div>
      <div
        className={`flex justify-between border-b pb-6 border-[#262626]/30 ${poppins.className}`}
      >
        <div>
          <h2 className="font-medium">Guests</h2>
          <p className="text-[#262626]/60 text-sm">{totalGuest} guest</p>
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

      {openModal && (
        <CheckGuestsModel
          adults={adults}
          setAdults={setAdults}
          younger={younger}
          setYounger={setYounger}
          infants={infants}
          setInfants={setInfants}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default CheckGuest;
