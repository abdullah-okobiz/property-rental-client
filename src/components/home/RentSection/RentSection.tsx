import RentCard from "@/components/card/RentCard/RentCard";
import SectionTitle from "@/utilits/SectionTitle";
import React from "react";

const RentSection = () => {
  return (
    <div className="Container py-12">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Properties"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <RentCard />
        <RentCard />
        <RentCard />
        <RentCard />
      </div>
    </div>
  );
};

export default RentSection;
