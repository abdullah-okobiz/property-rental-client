"use client";
import { poppins } from "@/app/font";
import RentCard from "@/components/card/RentCard/RentCard";
import SectionTitle from "@/utilits/SectionTitle";
import { useEffect, useState } from "react";

const RentSection = () => {
  const [rents, setRents] = useState([]);
  useEffect(() => {
    fetch("rentData.json")
      .then((res) => res.json())
      .then((data) => {
        setRents(data);
      });
  }, []);

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
        {rents?.map((rent,index) => (
          <RentCard key={index} rent={rent}></RentCard>
        ))}
      </div>

      <div className="flex items-center justify-center py-8 text-[#fff]">
        <button
          className={`bg-primary px-6 py-3 rounded font-medium cursor-pointer  ${poppins.className}`}
        >
          Load more..
        </button>
      </div>
    </div>
  );
};

export default RentSection;
