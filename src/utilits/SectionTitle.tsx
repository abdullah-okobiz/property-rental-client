import { poppins } from "@/app/font";
import React from "react";

interface Props {
  title: string;
  subTitle: string;
}
const SectionTitle: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h2
        className={`xl:text-3xl lg:text-3xl md:text-2xl text-xl font-semibold capitalize 2xl:w-[44%] xl:w-[50%] lg:w-[55%] w-full text-center text-secondary ${poppins.className}`}
      >
        {title}
      </h2>
      <p
        className={`text-thirdly lg:w-[40%] md:w-[50%] text-center md:text-base text-sm ${poppins.className}`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default SectionTitle;
