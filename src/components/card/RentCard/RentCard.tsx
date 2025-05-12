import { poppins } from "@/app/font";
import { TRoomDetails } from "@/types";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsPeople } from "react-icons/bs";
import { LiaBathSolid } from "react-icons/lia";
import { LuBed } from "react-icons/lu";
import { MdOutlineKingBed } from "react-icons/md";
import { PiMapPin } from "react-icons/pi";

interface Props {
  rent: TRoomDetails;
}

const RentCard: React.FC<Props> = ({ rent }) => {
  const { title, coverImage, floorPlan, price, location } = rent;
  return (
    <div
      className={`rounded shadow-sm hover:shadow-md group cursor-pointer border border-transparent hover:border-primary/30 duration-300 ${poppins.className}`}
    >
      <Link href={`rent/${1}`}>
        <div className="h-[280px] overflow-hidden relative group">
          <Image
            src={coverImage}
            alt="image"
            width={300}
            height={300}
            className="w-full h-full rounded-t object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-[-100%] left-0 w-full h-full bg-[#fff]/16 transition-all duration-700 group-hover:top-0"></div>
        </div>
      </Link>

      <div className="px-4 py-4">
        <h2 className="line-clamp-1  font-medium text-base">{title}</h2>
        <p className="flex items-center gap-2 mt-2">
          <span className="p-1 bg-primary/10 text-primary rounded">
            <PiMapPin className="text-lg" />
          </span>
          <span className="line-clamp-1 text-[#262626]/60 text-sm">
            {location}
          </span>
        </p>
        <p className=" mt-4">
          <span className="font-medium text-xl">৳ {price}</span>

          <span>/night</span>
        </p>
        {/* <div className="flex items-center flex-wrap gap-2 my-2">
          {floorPlan?.map((plan) => (
            <p key={plan._id} className="flex items-center gap-2">
              <span>{plan}</span>
            </p>
          ))}
        </div> */}

        <div className="flex items-center flex-wrap gap-2 my-2 text-sm text-[#262626]/60">
          {floorPlan && (
            <>
              {floorPlan.bedRoomCount > 0 && (
                <div className="flex items-center gap-2">
                  <span>
                    <MdOutlineKingBed />
                  </span>
                  <span>
                    {floorPlan.bedRoomCount} Bedroom
                    {floorPlan.bedRoomCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan.bathCount !== "" && (
                <div className="flex items-center gap-2">
                  <span>
                    <LiaBathSolid />
                  </span>
                  <span>
                    {floorPlan.bathCount} Bath
                    {Number(floorPlan.bathCount) > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan.bedCount > 0 && (
                <div className="flex items-center gap-2">
                  <span>
                    <LuBed />
                  </span>
                  <span>
                    {floorPlan.bedCount} Bed{floorPlan.bedCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan.guestCount > 0 && (
                <div className="flex items-center gap-2">
                  <span>
                    <BsPeople />
                  </span>
                  <span>
                    {floorPlan.guestCount} Guest
                    {floorPlan.guestCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentCard;
