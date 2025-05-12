"use client";
import RentCard from "@/components/card/RentCard/RentCard";
import SectionTitle from "@/utilits/SectionTitle";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const LandSection = () => {
  const [lands, setLands] = useState([]);
  useEffect(() => {
    fetch("landData.json")
      .then((res) => res.json())
      .then((data) => {
        setLands(data);
      });
  }, []);

  console.log("find rent landData", lands);
  return (
    <div className="Container pt-4">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Lands"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>
      <div>
        <div className="">
          <Swiper
            modules={[Pagination]}
            spaceBetween={8}
            slidesPerView={1}
            loop={true}
            pagination={{ el: ".custom-pagination", clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4 },
              1536: { slidesPerView: 4 },
            }}
          >
            {lands.map((land) => (
              <SwiperSlide key={land} className="py-2 px-1">
                <RentCard rent={land} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default LandSection;
