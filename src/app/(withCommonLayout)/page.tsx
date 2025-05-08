import Banner from "@/components/home/Banner/Banner";
import FlatsSection from "@/components/home/FlatsSection/FlatsSection";
import LandSection from "@/components/home/LandSection/LandSection";

import RentSection from "@/components/home/RentSection/RentSection";
import { getAllBanners } from "@/services/banners";
import { getAllFlats } from "@/services/flats";
import { getAllRents } from "@/services/rents";
import React from "react";

const page = async () => {
  const { data: banners } = await getAllBanners();
  const { data: rents } = await getAllRents();
  const { data: flats } = await getAllFlats();

  console.log("try to find all rents", rents);
  console.log("try to find all flats", flats);
  return (
    <div className="py-4">
      <Banner banners={banners} />

      <RentSection />
      <FlatsSection />
      <LandSection />
    </div>
  );
};

export default page;
