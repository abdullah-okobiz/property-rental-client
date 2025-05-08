import Banner from "@/components/home/Banner/Banner";
import RentSection from "@/components/home/RentSection/RentSection";
import SearchContainer from "@/components/home/search/searchContainer/SearchContainer";
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
      <SearchContainer/>
      <RentSection />
    </div>
  );
};

export default page;
