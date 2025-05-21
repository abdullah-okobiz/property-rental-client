import { poppins } from "@/app/font";
import CheckGuest from "@/components/checkout/CheckGuest/CheckGuest";
import Dates from "@/components/checkout/Dates/Dates";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import sslImage from "@/assets/images/sslcommerz.png";
import Image from "next/image";
import RentConfirmBtn from "@/components/action/RentConfirmBtn/RentConfirmBtn";
import CheckOutRentCard from "@/components/card/CheckOutRentCard/CheckOutRentCard";
import { getSingleRentBySlug } from "@/services/rents";
// import { useDateRange } from "@/contexts/DateRangeContext";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const { data } = await getSingleRentBySlug(resolvedParams.slug);

  console.log("find reserv single data", data);
  return (
    <div className="py-12 Container">
      <div
        className={`flex items-center gap-2 text-xl cursor-pointer ${poppins.className}`}
      >
        <p>
          <MdArrowBackIosNew />
        </p>
        <h1 className="text-3xl font-medium">Confirm and pay</h1>
      </div>

      <div className={`py-8  ${poppins.className}`}>
        <h2 className="text-xl font-medium">Your trip</h2>
      </div>

      <div className="flex gap-8">
        <div className="w-2/3 flex flex-col gap-12">
          <Dates />
          <CheckGuest />

          <div
            className={`flex justify-between border-b pb-6 border-[#262626]/30 ${poppins.className}`}
          >
            <div>
              <h2 className="font-medium text-xl">Pay with</h2>
            </div>
            <div>
              <Image src={sslImage} alt="sslImage" width={130} height={130} />
            </div>
          </div>

          <div
            className={`border-b pb-6 border-[#262626]/30 ${poppins.className}`}
          >
            <h2 className="font-medium text-xl">Cancellation policy</h2>
            <p className="py-2">
              You will not receive a refund if you cancel your reservation
            </p>
          </div>

          <div
            className={`border-b pb-6 border-[#262626]/30 ${poppins.className}`}
          >
            <h2 className="font-medium text-xl">Ground rules</h2>
            <p className="py-2 font-medium">
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>

            <ul className="flex flex-col gap-1 text-[#262626]/80">
              <li className="">1. Follow the house rules</li>
              <li>2.Treat your Hosts home like your own</li>
            </ul>
          </div>

          <RentConfirmBtn />
        </div>
        <div className="w-1/3">
          <CheckOutRentCard />
        </div>
      </div>
    </div>
  );
};

export default page;
