import { poppins } from "@/app/font";
import ImagesGallary from "@/components/details/RentDetails/ImagesGallary/ImagesGallary";
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiMapPinLine } from "react-icons/pi";

const images = [
  "https://i.ibb.co.com/7dfpZVVL/58579f3a2fed460cba15532daa5a0897-dhaka-hotel-bluebird-ltd-photo-19-1.jpg",
  "https://i.ibb.co.com/8LsJsTrm/6a5cf48ff8f740418ae59770fda84e76-dhaka-hotel-bluebird-ltd-photo-14.jpg",
  "https://i.ibb.co.com/5WHJn96T/b71df2d60c704214ba969731c242eba6-a292f390.jpg",
  "https://i.ibb.co.com/S4PgQXSm/01bfd90306904f31a9f47a20bdfa1c56-IMG20250503172040.jpg",
  "https://i.ibb.co.com/BKjk30jg/rent3.jpg",
];

const page = () => {
  return (
    <div className={`Container py-8 ${poppins.className}`}>
      <div className="flex flex-col">
        <h2 className={`text-2xl font-semibold`}>Family Room (2 Queen Bed)</h2>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-[#262626]/60 text-base">
            <span>
              <PiMapPinLine />
            </span>
            <span>
              Terrace View, House 4, Lake Drive Road, Sector 7, Uttara, Dhaka
            </span>
          </p>
          <p className="border border-[#262626]/20 p-2 rounded-full cursor-pointer hover:border-primary hover:text-primary duration-300">
            <IoIosHeartEmpty />
          </p>
        </div>
      </div>

      <div>
        <ImagesGallary images={images} />
      </div>

      <div>
                <p></p>
      </div>
    </div>
  );
};

export default page;
