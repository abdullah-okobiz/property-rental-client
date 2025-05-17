import { poppins } from "@/app/font";
import ImagesGallary from "@/components/details/RentDetails/ImagesGallary/ImagesGallary";
import React from "react";
import { BsPeople } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { LiaBathSolid } from "react-icons/lia";
import { LuBed } from "react-icons/lu";
import { MdOutlineKingBed } from "react-icons/md";
import { PiMapPinLine } from "react-icons/pi";
import defualtUser from "@/assets/user/avatar.png";
import Image from "next/image";
import RentDetails from "@/components/details/RentDetails/RentDetails";
import CleanderAndResever from "@/components/details/CleanderAndResever/CleanderAndResever";
import HostInformation from "@/components/details/HostInformation/HostInformation";

const images = [
  "https://i.ibb.co.com/7dfpZVVL/58579f3a2fed460cba15532daa5a0897-dhaka-hotel-bluebird-ltd-photo-19-1.jpg",
  "https://i.ibb.co.com/8LsJsTrm/6a5cf48ff8f740418ae59770fda84e76-dhaka-hotel-bluebird-ltd-photo-14.jpg",
  "https://i.ibb.co.com/5WHJn96T/b71df2d60c704214ba969731c242eba6-a292f390.jpg",
  "https://i.ibb.co.com/S4PgQXSm/01bfd90306904f31a9f47a20bdfa1c56-IMG20250503172040.jpg",
  "https://i.ibb.co.com/BKjk30jg/rent3.jpg",
  // "https://i.ibb.co.com/BKjk30jg/rent3.jpg",
  // "https://i.ibb.co.com/BKjk30jg/rent3.jpg",
];

const page = () => {
  return (
    <div className={`Container py-8 ${poppins.className}`}>
      <div className="flex flex-col">
        <h2 className={`xl:text-2xl lg:text-xl text-lg font-medium`}>
          Family Room (2 Queen Bed)
        </h2>
        <div className="flex items-center justify-between py-2">
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

      <div className="flex items-center gap-4 border-b border-[#262626]/30 pb-4 lg:w-[60%]">
        <div className="border-2 border-[#262626]/40 rounded-full">
          <Image
            src={defualtUser}
            alt="user"
            width={35}
            height={35}
            className="opacity-50"
          />
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="text-xl font-medium">
            Entire villa hosted by <span>Mishu</span>
          </h2>
          <div>
            <div className="flex items-center flex-wrap gap-4 my-2">
              <div className="flex items-center gap-2">
                <span>
                  <MdOutlineKingBed />
                </span>
                <span>6 Bedroom</span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <LiaBathSolid />
                </span>
                <span>2 Bath</span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <LuBed />
                </span>
                <span>2 Bed</span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <BsPeople />
                </span>
                <span>5 Guest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <RentDetails />
      </div>

      <div className="py-6 border-b border-[#262626]/30 pb-6 lg:w-[60%]">
        <h2 className="text-xl font-medium">House Details</h2>

        <div className="flex items-center gap-2 mt-4 pb-2">
          <p className="px-4 py-2 rounded bg-[#F2F2F5] text-[#262626]/80 text-sm">
            Fire extinguisher
          </p>
          <p className="px-4 py-2 rounded bg-[#F2F2F5] text-[#262626]/80 text-sm">
            First aid kit
          </p>
        </div>
      </div>

      <div className="">
        <CleanderAndResever />
      </div>

      <div className="py-6 border-b border-[#262626]/30 pb-6 lg:w-[60%]">
        <HostInformation />
      </div>
    </div>
  );
};

export default page;
