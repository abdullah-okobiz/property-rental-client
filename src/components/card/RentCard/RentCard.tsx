import { poppins } from "@/app/font";

import Image from "next/image";
import React from "react";
import { PiMapPin } from "react-icons/pi";

const RentCard = ({ rent }) => {
  const { title, coverImage, amenities, price, location } = rent;
  return (
    <div className={`rounded shadow-lg ${poppins.className}`}>
      <div className="h-[280px]">
        <Image
          src={coverImage}
          alt="image"
          width={300}
          height={300}
          className="w-full h-full rounded-t"
        />
      </div>

      <div className="px-4 py-4">
        <h2 className="line-clamp-1 text-primary font-medium text-lg">
          {title}
        </h2>
        <p className="flex items-center gap-2 mt-2">
          <span className="p-1 bg-primary/10 text-primary rounded">
            <PiMapPin className="text-lg" />
          </span>
          <span className="line-clamp-1 text-[#262626]/60">{location}</span>
        </p>
        <p className=" mt-2">
          <span className="font-medium text-xl">৳ {price}</span>

          <span>/night</span>
        </p>
        <div>
          {amenities?.map((amenity) => (
            <p key={amenity._id} className="flex items-center gap-2">
              <span>
                <Image
                  src={amenity.amenitiesImage}
                  alt=""
                  width={40}
                  height={40}
                />
              </span>
              <span>{amenity.amenitiesLabel}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentCard;
