import BlogSection from "@/components/blog/blogContainer/BlogSection/BlogSection";
import Banner from "@/components/home/Banner/Banner";
import ChooseSection from "@/components/home/ChooseSection/ChooseSection";
import FlatsSection from "@/components/home/FlatsSection/FlatsSection";
import LandSection from "@/components/home/LandSection/LandSection";

import RentSection from "@/components/home/RentSection/RentSection";
import SearchContainer from "@/components/home/search/searchContainer/SearchContainer";
import { getAllBanners } from "@/services/banners";
import { getAllBlogs } from "@/services/blog";
import { getAllChoose } from "@/services/choose";
// import { getAllFlats } from "@/services/flats";
// import { getAllRents } from "@/services/rents";
import React from "react";

const page = async () => {
  const { data: banners } = await getAllBanners();
  // const { data: rents } = await getAllRents();
  // const { data: flats } = await getAllFlats();

  const { data } = await getAllBlogs();
  const { data: chooses } = await getAllChoose();
  return (
    <div>
      <div className="relative">
        <Banner banners={banners} />
        <div className="w-full px-10 absolute left-1/2 bottom-[-50px] -translate-x-1/2 z-10">
          <SearchContainer />
        </div>
      </div>
      <RentSection />
      <FlatsSection />
      <LandSection />
      <BlogSection blogs={data} />
      {/* <AboutHeader />
      <AboutCardContainer /> */}
      <ChooseSection chooses={chooses} />
    </div>
  );
};

export default page;
