"use client";
import { poppins } from "@/app/font";
import RentCard from "@/components/card/RentCard/RentCard";
import { IRent } from "@/types";
import SectionTitle from "@/utilits/SectionTitle";
import Link from "next/link";
import React from "react";

interface Props {
  rents: IRent[];
}

const RentSection: React.FC<Props> = ({ rents }) => {
  console.log("find rent data", rents);
  return (
    <div className="Container pt-28">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Properties"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>

      <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {rents?.slice(0, 8).map((rent) => (
          <RentCard key={rent._id} rent={rent} linkPrefix="rent"></RentCard>
        ))}
      </div>

      <div className="flex items-center justify-center py-8 text-[#fff]">
        <Link href="/rent">
          <button
            className={`bg-primary px-6 py-3 rounded font-medium cursor-pointer  ${poppins.className}`}
          >
            Load more..
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RentSection;
