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
import RulesRent from "@/components/details/RulesRent/RulesRent";
import { getSingleRentBySlug } from "@/services/rents";
import { apiBaseUrl } from "@/config/config";
import { IAmenities } from "@/types";

interface Props {
  params: Promise<{
    rentSlug: string;
  }>;
}

const page = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { data: rent } = await getSingleRentBySlug(resolvedParams.rentSlug);
  const {
    title,
    location,
    images,
    description,
    amenities,
    allowableThings,
    cancellationPolicy,
    houseRules,
    floorPlan,
  } = rent;
  return (
    <div className={`Container py-8 ${poppins.className}`}>
      <div className="flex flex-col">
        <h2 className={`xl:text-2xl lg:text-xl text-lg font-medium`}>
          {title}
        </h2>
        <div className="flex items-center justify-between py-2">
          <p className="flex items-center gap-1 font-medium text-[#262626]/60 text-base">
            <span>
              <PiMapPinLine />
            </span>
            <span>{location}</span>
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
            <div className="flex items-center flex-wrap gap-2 my-2 text-sm text-[#262626]/60">
              {floorPlan && (
                <>
                  {floorPlan.bedroomCount > 0 && (
                    <div className="flex items-center gap-2">
                      <span>
                        <MdOutlineKingBed />
                      </span>
                      <span>
                        {floorPlan.bedroomCount} Bedroom
                        {floorPlan.bedroomCount > 1 ? "s" : ""}
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
                        {floorPlan.bedCount} Bed
                        {floorPlan.bedCount > 1 ? "s" : ""}
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
      </div>

      <div>
        <RentDetails description={description} />
      </div>

      <div className="py-6 border-b border-[#262626]/30 pb-6 lg:w-[60%]">
        <h2 className="text-xl font-medium">House Details</h2>

        <div className="flex items-center gap-2 mt-4 pb-2">
          {amenities?.map((amenitie: IAmenities) => (
            <div
              key={amenitie._id}
              className="px-4 py-2 rounded bg-[#F2F2F5] text-[#262626]/80 text-sm flex items-center gap-1"
            >
              <div className="w-[30px]">
                <Image
                  src={apiBaseUrl + amenitie.amenitiesImage}
                  alt="amenitie.amenitiesLabel"
                  width={30}
                  height={30}
                />
              </div>
              <p>{amenitie.amenitiesLabel}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <CleanderAndResever />
      </div>

      <div className="py-6 border-b border-[#262626]/30 pb-6 lg:w-[60%]">
        <HostInformation />
      </div>

      <div className="py-6">
        <RulesRent
          houseRules={houseRules}
          cancellationPolicy={cancellationPolicy}
          allowableThings={allowableThings}
        />
      </div>
    </div>
  );
};

export default page;
