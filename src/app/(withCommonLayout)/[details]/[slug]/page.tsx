import { poppins } from "@/app/font";
import ImagesGallary from "@/components/details/RentDetails/ImagesGallary/ImagesGallary";
import React from "react";
import { BsCalendar2Date, BsHouses, BsPeople } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { LiaBathSolid } from "react-icons/lia";
import { LuBed } from "react-icons/lu";
import { MdOutlineKingBed } from "react-icons/md";
import { PiHouseLine, PiMapPinLine } from "react-icons/pi";
import Image from "next/image";
import RentDetails from "@/components/details/RentDetails/RentDetails";
import CleanderAndResever from "@/components/details/CleanderAndResever/CleanderAndResever";
import HostInformation from "@/components/details/HostInformation/HostInformation";

import { getSingleRentBySlug } from "@/services/rents";

import { getSingleFlatBySlug } from "@/services/flats";
import { getSingleLandBySlug } from "@/services/land";
import { notFound } from "next/navigation";
import RulesRent from "@/components/details/RulesRent/RulesRent";
import AmenitiesForRent from "@/components/details/Amenities/AmenitiesForRent/AmenitiesForRent";
import AmenitiesForFlat from "@/components/details/AmenitiesForFlat/AmenitiesForFlat";
import FlatAndLandVideo from "@/components/details/FlatAndLandVideo/FlatAndLandVideo";
import { apiBaseUrl } from "@/config/config";
import Appointment from "@/components/details/Appointment/Appointment";

import { FC } from "react";

interface PageProps {
  params: Promise<{
    details: string;
    slug: string;
  }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params;




  let resData = null;


  try {
    if (resolvedParams.details === "flat") {
      const { data } = await getSingleFlatBySlug(resolvedParams.slug);
      console.log("---------------data", data);

      resData = data;
    } else if (resolvedParams.details === "rent") {
      const { data } = await getSingleRentBySlug(resolvedParams.slug);
      console.log("---------------data", data);

      resData = data;
    } else if (resolvedParams.details === "land") {
      const { data } = await getSingleLandBySlug(resolvedParams.slug);
      console.log("---------------data", data);

      resData = data;
    } else {
      return notFound();
    }
  } catch (error) {
    return notFound();
    console.log(error);
  }



  if (!resData) return notFound();

  const {
    location,
    images,
    title,
    description,
    amenities,
    allowableThings,
    cancellationPolicy,
    houseRules,
    floorPlan,
    buildingYear,
    video,
    host,
    price,
    slug,
  } = resData;

  return (
    <div className={`Container py-8 ${poppins.className}`}>
      <div className="lg:flex flex-col hidden">
        <h2 className="xl:text-2xl lg:text-xl md:text-base text-base font-medium">
          {title}
        </h2>
        <div className="flex items-center justify-between py-2">
          <p className="flex items-center gap-1 font-medium text-[#262626]/60 text-base">
            <PiMapPinLine />
            <span>{location}</span>
          </p>
          <p className="border border-[#262626]/20 p-2 rounded-full cursor-pointer hover:border-primary hover:text-primary duration-300">
            <IoIosHeartEmpty />
          </p>
        </div>
      </div>

      <ImagesGallary images={images} />

      <div className="flex flex-col lg:hidden mt-4">
        <h2 className="xl:text-2xl lg:text-xl md:text-lg text-base font-medium capitalize">
          {title}
        </h2>
        <div className="flex items-center justify-between py-1">
          <p className="flex md:items-center items-start gap-1 font-medium text-[#262626]/60 text-base">
            <PiMapPinLine className="md:text-xl text-2xl" />
            <span className="md:text-base text-sm">{location}</span>
          </p>
          <p className="border border-[#262626]/20 p-2 rounded-full cursor-pointer hover:border-primary hover:text-primary duration-300 hidden lg:block">
            <IoIosHeartEmpty />
          </p>
        </div>
      </div>

      <div className="flex md:items-center items-baseline gap-4 border-b border-[#262626]/30 pb-4 xl:w-[60%] w-full">
        <div>
          {host && (
            <div className="border-2 border-[#262626]/40 rounded-full">
              {host?.avatar ? (
                <Image
                  src={apiBaseUrl + host.avatar}
                  alt="user"
                  width={55}
                  height={35}
                  className="opacity-50"
                />
              ) : (
                <div className="border pt-1 flex item-center justify-center w-8 h-8 border-[#262626]/20 rounded-full text-center">
                  ?
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col item-center justify-between mt-6 w-full">
          <div className="flex flex-col">
            {host && (
              <h2 className="md:text-xl text-base font-medium">
                Entire villa hosted by <span>{host.name}</span>
              </h2>
            )}
            <div className="flex items-center flex-wrap gap-2 my-2 text-sm text-[#262626]/60">
              {floorPlan?.bedroomCount > 0 && (
                <div className="flex items-center gap-1">
                  <MdOutlineKingBed />
                  <span>
                    {floorPlan.bedroomCount} Bedroom
                    {floorPlan.bedroomCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan?.bathCount && (
                <div className="flex items-center gap-1">
                  <LiaBathSolid />
                  <span>
                    {floorPlan.bathCount} Bath
                    {Number(floorPlan.bathCount) > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan?.bedCount > 0 && (
                <div className="flex items-center gap-1">
                  <LuBed />
                  <span>
                    {floorPlan.bedCount} Bed{floorPlan.bedCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan?.guestCount > 0 && (
                <div className="flex items-center gap-1">
                  <BsPeople />
                  <span>
                    {floorPlan.guestCount} Guest
                    {floorPlan.guestCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan?.drawing == true && (
                <div className="flex items-center gap-1">
                  <PiHouseLine />

                  <span>
                    {floorPlan.guestCount} Drawing
                    {floorPlan.guestCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {floorPlan?.dinning == true && (
                <div className="flex items-center gap-1">
                  <BsHouses />

                  <span>
                    {floorPlan.guestCount} Dinning
                    {floorPlan.guestCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}

              <div>
                {buildingYear && (
                  <p className="flex item-center gap-1">
                    <span>
                      <BsCalendar2Date className="pt-1" />
                    </span>
                    <span> {buildingYear} Year</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            {resolvedParams.details === "rent" ? (
              ""
            ) : (
              <Appointment title={title} />
            )}
          </div>
        </div>
      </div>

      <div className="flex xl:gap-20 lg:gap-12">
        <RentDetails description={description} />
        {video && <FlatAndLandVideo video={video} />}
      </div>

      <div>
        {resolvedParams.details === "rent" && (
          <AmenitiesForRent amenities={amenities} />
        )}
        {resolvedParams.details === "flat" && (
          <div>
            <AmenitiesForFlat amenities={amenities} />
          </div>
        )}
      </div>

      <div className="">
        {resolvedParams.details === "rent" ? (
          <CleanderAndResever title={title} slug={slug} price={price} />
        ) : (
          <div>{/* <Appointment /> */}</div>
        )}
      </div>

      {resolvedParams.details === "rent" && (
        <div className="py-6 border-b border-[#262626]/30 pb-6 lg:w-[60%]">
          {" "}
          <HostInformation />{" "}
        </div>
      )}

      {(allowableThings || cancellationPolicy || houseRules) && (
        <div className="py-6">
          <RulesRent
            houseRules={houseRules}
            cancellationPolicy={cancellationPolicy}
            allowableThings={allowableThings}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
