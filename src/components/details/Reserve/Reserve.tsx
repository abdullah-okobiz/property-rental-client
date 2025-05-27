"use client";
import { DateRangePicker } from "react-date-range";
import React, { useEffect, useRef, useState } from "react";
import { PiCalendarCheckThin, PiSpinnerGapBold } from "react-icons/pi";
import { poppins } from "@/app/font";
import GuestsModal from "@/components/modals/GuestsModal";
import { IoIosArrowDown } from "react-icons/io";
import { format } from "date-fns";
// import Link from "next/link";
import { useDateRange } from "@/contexts/DateRangeContext";
import { HiXMark } from "react-icons/hi2";
import useAuth from "@/hooks/useAuth";
import { TFloorPlan } from "@/types";
import LoginModal from "@/components/modals/LoginModal";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
  price: number;

  floorPlan: TFloorPlan;
}
const Reserve: React.FC<Props> = ({ slug, price, floorPlan }) => {
  // this is for cleander
  const [showPicker, setShowPicker] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dateRange, setDateRange } = useDateRange();
  const { startDate, endDate } = dateRange;
  const router = useRouter();
  const numberOfNights =
    startDate && endDate
      ? (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      : 1;

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

  const { guestInfo, setGuestInfo } = useDateRange();

  // const [showGuests, setShowGuests] = useState(false);

  // inside guest modal handler
  const handleGuestChange = (
    type: "adults" | "younger" | "infants",
    value: number
  ) => {
    setGuestInfo({
      ...guestInfo,
      [type]: value,
    });
  };

  const subTotal = price * numberOfNights;

  const { user } = useAuth();
  // const [showMessage, setShowMessage] = useState(false);
  const isGuest = user?.role === "guest";

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (!isGuest) {
  //     e.preventDefault(); // Prevent navigation
  //     setShowMessage(true);
  //   }
  // };

  const [hoverMessage, setHoverMessage] = useState(false);
  console.log("find user", user);
  return (
    <div className="">
      <div className="border border-[#262626]/20 shadow rounded p-4">
        <p className="text-primary bg-primary/20 rounded px-4 py-2 inline-flex font-medium">
          ৳{price} night
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
                <p className="font-medium xl:text-base text-sm">
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
                <p className="xl:text-base text-sm">
                  {dateRange.endDate
                    ? format(dateRange.endDate, "MMM d, yyyy")
                    : "Add Dates"}
                </p>
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
                <p className="font-medium xl:text-base text-sm">
                  <span>{guestInfo.totalGuest}</span> Guests
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

          <div className="py-2">
            {numberOfNights && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-medium md:text-base text-sm">
                    <p>৳{price} night</p>
                    <p>
                      <HiXMark />
                    </p>
                    <p>{numberOfNights}</p>
                  </div>
                  <div>
                    <p>৳{subTotal}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between font-medium mt-2 border-b pb-4 border-[#262626]/20">
                  <p>Gateway fee</p>
                  <p>৳00.00</p>
                </div>

                <div className="flex items-center justify-between font-medium mt-2 text-lg">
                  <p>Total Cost</p>
                  <p>৳{subTotal}</p>
                </div>
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => {
              if (!isGuest) setHoverMessage(true);
            }}
            onMouseLeave={() => setHoverMessage(false)}
            className="relative w-full"
          >
            <button
              onClick={() => {
                if (isGuest) {
                  setLoading(true); // Start loading
                  router.push(`/checkout/${slug}`);
                } else {
                  setShowLoginModal(true);
                }
              }}
              disabled={loading} // Optional: disable button when loading
              className={`py-3 rounded text-white font-medium w-full my-2 transition-colors duration-200 ${
                isGuest
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <PiSpinnerGapBold className="animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Reserve"
              )}
            </button>

            {!isGuest && hoverMessage && (
              <div className="absolute top-25 left-15 text-sm text-[#fff] bg-primary px-4 py-2 rounded">
                Please login as a guest to reserve the rent.
              </div>
            )}
          </div>
        </div>

        <div className="">
          <div
            ref={modalRef}
            className={`
      absolute w-full left-0 -bottom-12 transition-all px-4  duration-300 ease-in-out
      ${
        showGuests
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-4 invisible"
      }
    `}
          >
            <GuestsModal
              adults={guestInfo.adults}
              setAdults={(val) => handleGuestChange("adults", val)}
              younger={guestInfo.younger}
              setYounger={(val) => handleGuestChange("younger", val)}
              infants={guestInfo.infants}
              setInfants={(val) => handleGuestChange("infants", val)}
              setShowGuests={setShowGuests}
              floorPlan={floorPlan}
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
              months={1}
              ranges={[{ ...dateRange, key: "selection" }]}
              direction="horizontal"
              preventSnapRefocus={true}
              staticRanges={[]}
              inputRanges={[]}
              className="lg:w-full xl:w-[90%] border-r border-[#262626]/10 relative z-50 object-cover lg:ml-[-10px]"
            />
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Reserve;
