"use client";

import { useState, useEffect } from "react";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

export default function FloorPlanStep() {
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalGuests = adults + children + infants;

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;

    const floorPlan = {
      bedroomCount: bedrooms,
      bathCount: bathrooms,
      bedCount: beds,
      guestCount: totalGuests,
    };

    try {
      const res = await CategoryServices.processUpdateFloorPlan(
        featureType,
        listingId,
        floorPlan
      );
      console.log("Submitted floor plan:", res);
    } catch (error) {
      console.error("Failed to submit floor plan:", error);
    }
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [bedrooms, bathrooms, beds, adults, children, infants]);

  const renderCounter = (
    label: string,
    value: number,
    onChange: (val: number) => void
  ) => (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-medium text-base">{label}</h2>
      </div>
      <div className="flex items-center gap-3">
        <p
          onClick={() => value > 0 && onChange(value - 1)}
          className="text-2xl w-[30px] h-[30px] text-center rounded-full border cursor-pointer text-[#262626]/50"
        >
          -
        </p>
        <span className="text-lg">{value}</span>
        <p
          onClick={() => onChange(value + 1)}
          className="text-xl w-[30px] h-[30px] text-center rounded-full border cursor-pointer text-[#262626]/50"
        >
          +
        </p>
      </div>
    </div>
  );

  return (
    <div className=" bg-white rounded shadow py-4 px-4 max-w-6xl space-y-4 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 tracking-wider">
        Share some basics about your place
      </h2>
      <h4 className="text-gray-400 tracking-wide">
        You ll add more details later, like bed types
      </h4>
      <div className="flex flex-col space-y-6">
        {renderCounter("Bedrooms", bedrooms, setBedrooms)}
        {renderCounter("Bathrooms", bathrooms, setBathrooms)}
        {renderCounter("Beds", beds, setBeds)}
        {renderCounter("Adults", adults, setAdults)}
        {renderCounter("Children", children, setChildren)}
        {renderCounter("Infants", infants, setInfants)}
      </div>
    </div>
  );
}
