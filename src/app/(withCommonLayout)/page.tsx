import Banner from "@/components/home/Banner/Banner";
import RentSection from "@/components/home/RentSection/RentSection";
import { getAllBanners } from "@/services/banners";
import React from "react";

const page = async () => {
  const { data: banners } = await getAllBanners();
  return (
    <div>
      <Banner banners={banners} />
      <RentSection />
    </div>
  );
};

export default page;
