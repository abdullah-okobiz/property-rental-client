import { DateRangePicker } from "react-date-range";
import React, { useEffect, useRef, useState } from "react";
import { PiCalendarCheckThin } from "react-icons/pi";
import { poppins } from "@/app/font";
import GuestsModal from "@/components/modals/GuestsModal";
import { IoIosArrowDown } from "react-icons/io";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  dateRange: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  setDateRange: (range: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
}
const Reserve: React.FC<Props> = ({ dateRange, setDateRange }) => {
  // this is for cleander
  const [showPicker, setShowPicker] = useState(false);

  const cleanderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside2 = (event: MouseEvent) => {
      if (
        cleanderRef.current &&
        !cleanderRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside2);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, [showPicker]);

  // this is for guests modal
  const [showGuests, setShowGuests] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowGuests(false);
      }
    };

    if (showGuests) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuests]);

  const [adults, setAdults] = useState(0);
  const [younger, setYounger] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalGuest = adults + younger + infants || 0;
  return (
    <div className="mt-20  relative  bg-[#fff]">
      <div className="border border-[#262626]/20 shadow rounded p-4">
        <p className="text-primary bg-primary/20 rounded px-4 py-2 inline-flex font-medium">
          ৳1400 night
        </p>

        <div
          className={`border-[#262626]/20 border rounded py-2 mt-4 ${poppins.className}`}
        >
          <div
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center justify-between px-2  gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 text-primary  p-2 rounded">
                <PiCalendarCheckThin />
              </div>
              <div>
                <p className="text-[12px] uppercase text-[#262626]/50">
                  Check-in
                </p>
                <p className="font-medium">
                  {dateRange.startDate
                    ? format(dateRange.startDate, "MMM d, yyyy")
                    : "Add Dates"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/20 text-primary  p-2 rounded">
                <PiCalendarCheckThin />
              </div>
              <div>
                <p className="text-[12px] uppercase text-[#262626]/50">
                  Check-out
                </p>
                {/* <p className="font-medium">Add Dates</p> */}
                {dateRange.endDate
                  ? format(dateRange.endDate, "MMM d, yyyy")
                  : "Add Dates"}
              </div>
            </div>
          </div>

          <div
            className="border-t border-[#262626]/20 mt-2 pt-2 flex items-center justify-between cursor-pointer"
            onClick={() => setShowGuests(!showGuests)}
          >
            <div className="flex items-center gap-3 px-2">
              <div className="bg-primary/20 text-primary p-2 rounded">
                <PiCalendarCheckThin />
              </div>
              <div>
                <p className="text-[12px] uppercase text-[#262626]/50">
                  guests
                </p>
                <p className="font-medium">
                  <span>{totalGuest}</span> Guests
                </p>
              </div>
            </div>

            <div
              className={`text-xl px-2 transform transition-transform duration-300 ${
                showGuests ? "rotate-180" : ""
              }`}
            >
              <IoIosArrowDown />
            </div>
          </div>
        </div>

        <div>
          <p className="text-center py-2 text-base mt-2 text-[#262626]/70 font-medium">
            You won&#39;t be charged yet
          </p>
          <Link href="/checkout">
            <button className="py-3 rounded bg-primary text-[#fff] font-medium w-full my-2 cursor-pointer">
              Reserve
            </button>
          </Link>
        </div>

        <div className="">
          <div
            ref={modalRef}
            className={`
      absolute w-full left-0 -bottom-24 transition-all px-4 duration-300 ease-in-out
      ${
        showGuests
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-4 invisible"
      }
    `}
          >
            <GuestsModal
              adults={adults}
              setAdults={setAdults}
              younger={younger}
              setYounger={setYounger}
              infants={infants}
              setInfants={setInfants}
              setShowGuests={setShowGuests}
            />
          </div>
        </div>

        <div className="">
          <div
            ref={cleanderRef}
            className={`
      absolute w-full left-0 top-34 transition-all px-4 duration-300 ease-in-out
      ${
        showPicker
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-4 invisible"
      }
    `}
          >
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
    </div>
  );
};

export default Reserve;
