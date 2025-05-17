import React from "react";
import rentImage from "@/assets/images/rentImage.jpeg";
import Image from "next/image";
import { poppins } from "@/app/font";
import { HiMiniXMark } from "react-icons/hi2";
const CheckOutRentCard = () => {
  return (
    <div
      className={`sticky top-30 border border-[#262626]/20 shadow rounded px-4 py-4 flex flex-col gap-4 ${poppins.className}`}
    >
      <div className="flex gap-2 border-b border-[#262626]/12 pb-5">
        <div className="w-[100px] h-[100px] rounded">
          <Image
            src={rentImage}
            alt="rentImage"
            width={100}
            height={100}
            className="w-full h-full rounded"
          />
        </div>
        <div className="w-[70%] line-clamp-4">
          <p className="font-medium">Safe & Cozy Twin Deluxe Room</p>
        </div>
      </div>

      <div className="border-b border-[#262626]/12 pb-5">
        <h2 className="text-xl font-medium">Price details</h2>

        <div className="flex items-center justify-between mt-3">
          <p className="flex items-center">
            <span>৳1800</span>
            <span>
              <HiMiniXMark />
            </span>
            <span>2 nights</span>
          </p>

          <p>৳3600</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="">Gateway fee</p>
          <p>৳300</p>
        </div>
      </div>

      <div className="flex items-center justify-between font-semibold">
        <p className="">Total amount</p>
        <p>৳3600</p>
      </div>
    </div>
  );
};

export default CheckOutRentCard;
