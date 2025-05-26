import { poppins } from "@/app/font";
import { TFloorPlan } from "@/types";
import React from "react";

interface GuestsModalProps {
  adults: number;
  setAdults: (value: number) => void;
  younger: number;
  setYounger: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
  setShowGuests: (value: boolean) => void;
  floorPlan: TFloorPlan;
}

const GuestsModal: React.FC<GuestsModalProps> = ({
  adults,
  setAdults,
  younger,
  setYounger,
  infants,
  setInfants,
  setShowGuests,
  floorPlan,
}) => {
  const totalGuests = adults + younger + infants;

  const isMaxReached =
    floorPlan.guestCount !== undefined && totalGuests >= floorPlan.guestCount;

  return (
    <div
      className={`border bg-[#fff] rounded shadow py-4 px-4 relative pb-10 ${poppins.className}`}
    >
      <div className="flex flex-col gap-4">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-base">Adults</h2>
            <p className="text-sm text-[#262626]/80">Ages 13+</p>
          </div>
          <div className="flex items-center gap-3">
            <p
              onClick={() => adults > 0 && setAdults(adults - 1)}
              className="text-2xl w-[30px] h-[30px] text-center rounded-full border cursor-pointer text-[#262626]/50"
            >
              -
            </p>
            <span className="text-lg">{adults}</span>
            <p
              onClick={() => {
                if (isMaxReached) return;
                setAdults(adults + 1);
              }}
              className={`text-xl w-[30px] h-[30px] text-center rounded-full border ${
                isMaxReached
                  ? "cursor-not-allowed text-[#262626]/20"
                  : "cursor-pointer text-[#262626]/50"
              }`}
            >
              +
            </p>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-base">Children</h2>
            <p className="text-sm text-[#262626]/80">Ages 2–12</p>
          </div>
          <div className="flex items-center gap-3">
            <p
              onClick={() => younger > 0 && setYounger(younger - 1)}
              className="text-2xl w-[30px] h-[30px] text-center rounded-full border cursor-pointer text-[#262626]/50"
            >
              -
            </p>
            <span className="text-lg">{younger}</span>
            <p
              onClick={() => {
                if (isMaxReached) return;
                setYounger(younger + 1);
              }}
              className={`text-xl w-[30px] h-[30px] text-center rounded-full border ${
                isMaxReached
                  ? "cursor-not-allowed text-[#262626]/20"
                  : "cursor-pointer text-[#262626]/50"
              }`}
            >
              +
            </p>
          </div>
        </div>

        {/* Infants */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-base">Infants</h2>
            <p className="text-sm text-[#262626]/80">Under 2</p>
          </div>
          <div className="flex items-center gap-3">
            <p
              onClick={() => infants > 0 && setInfants(infants - 1)}
              className="text-2xl w-[30px] h-[30px] text-center rounded-full border cursor-pointer text-[#262626]/50"
            >
              -
            </p>
            <span className="text-lg">{infants}</span>
            <p
              onClick={() => {
                if (isMaxReached) return;
                setInfants(infants + 1);
              }}
              className={`text-xl w-[30px] h-[30px] text-center rounded-full border ${
                isMaxReached
                  ? "cursor-not-allowed text-[#262626]/20"
                  : "cursor-pointer text-[#262626]/50"
              }`}
            >
              +
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div
          className="right-5 bottom-2 absolute cursor-pointer"
          onClick={() => setShowGuests(false)}
        >
          <p className="text-base font-medium capitalize underline hover:text-primary duration-300">
            close
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsModal;
