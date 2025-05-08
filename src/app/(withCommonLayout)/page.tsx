import Banner from "@/components/home/Banner/Banner";
import FlatsSection from "@/components/home/FlatsSection/FlatsSection";

import RentSection from "@/components/home/RentSection/RentSection";
import SearchContainer from "@/components/home/search/searchContainer/SearchContainer";
import { getAllBanners } from "@/services/banners";
import { getAllRents } from "@/services/rents";
import React from "react";

const page = async () => {
  const { data: banners } = await getAllBanners();
  const { data: rents } = await getAllRents();
  return (
    <div>
      <div className="relative">
        <Banner banners={banners} />
        <div className="w-full px-10 absolute left-1/2 bottom-[-30px] -translate-x-1/2 z-10">
          <SearchContainer />
        </div>
      </div>
      <RentSection />
      <FlatsSection />
    </div>
  );
};

export default page;
