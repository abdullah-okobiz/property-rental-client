"use client";
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
    <div className="Container py-12">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Properties"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {rents?.map((rent) => (
          <RentCard key={rent._id} rent={rent}></RentCard>
        ))}
      </div>
    </div>
  );
};

export default RentSection;
