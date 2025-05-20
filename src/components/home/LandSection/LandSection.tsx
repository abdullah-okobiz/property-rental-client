"use client";
import RentCard from "@/components/card/RentCard/RentCard";
import { IRent } from "@/types";
import SectionTitle from "@/utilits/SectionTitle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  lands: IRent[];
}
const LandSection: React.FC<Props> = ({ lands }) => {
  return (
    <div className="Container pt-8">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Lands"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>
      <div>
        <div className="pt-4">
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
            {lands?.slice(0, 8).map((land) => (
              <SwiperSlide key={land._id} className="py-2 px-1">
                <RentCard rent={land} linkPrefix="land" />
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
