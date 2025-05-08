import Banner from "@/components/home/Banner/Banner";
import RentSection from "@/components/home/RentSection/RentSection";
import { getAllBanners } from "@/services/banners";
import { getAllRents } from "@/services/rents";
import React from "react";

const page = async () => {
  const { data: banners } = await getAllBanners();
  const { data: rents } = await getAllRents();

  console.log("try to find all rents",rents)
  return (
    <div>
      <Banner banners={banners} />
      
      <RentSection />
    </div>
  );
};

export default page;
