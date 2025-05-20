"use client";

import SectionTitle from "@/utilits/SectionTitle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../BlogCard";
import { IBlog } from "../../types";
import React from "react";
interface Props {
  blogs: IBlog[];
}
const BlogSection: React.FC<Props> = ({ blogs }) => {

  return (
    <div className="Container pt-12">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Lands"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>
      <div>
        <div className="mt-8">
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
            {blogs?.map((blog) => (
              <SwiperSlide key={blog._id} className="py-2 px-1">
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
