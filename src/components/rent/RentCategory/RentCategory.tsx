"use client";
import { poppins } from "@/app/font";
import { ICategory } from "@/types";
import React, { useState } from "react";

interface Props {
  rentCategories: ICategory[];
}

const RentCategory: React.FC<Props> = ({ rentCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleSelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const allCategories = [
    { _id: "all", categoryName: "All Rents" },
    ...rentCategories,
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {allCategories.map((category) => {
        const isSelected = selectedCategoryId === category._id;

        return (
          <div key={category._id}>
            <p
              onClick={() => handleSelect(category._id)}
              className={`
                border 
                ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-[#262626]/40 text-black"
                }
                hover:border-primary hover:text-white hover:bg-primary 
                duration-300 rounded px-2 py-1 text-sm font-medium cursor-pointer 
                ${poppins.className}
              `}
            >
              {category.categoryName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RentCategory;
