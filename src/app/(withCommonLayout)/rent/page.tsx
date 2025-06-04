// app/rent/page.tsx or wherever your Rent page is
"use server";

import RentCategory from "@/components/rent/RentCategory/RentCategory";
import RentList from "@/components/rent/RentList/RentList";
import { getAllCategory } from "@/services/category";
import { getAllFeature } from "@/services/feature";
import { getAllRents } from "@/services/rents";
import { IListingFor } from "@/types";
import React from "react";

// Load RentList dynamically as client component

interface RentProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const Rent: React.FC<RentProps> = async ({ searchParams }) => {
  const { data: features } = await getAllFeature();
  const resolvedParams = await searchParams;

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Rent"
  );
  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);
  const categoryId = resolvedParams.category;

  const { data: rents } = await getAllRents({
    category: categoryId !== "all" ? categoryId : undefined,
  });

  return (
    <div className="Container mt-16">
      <RentCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />
      <RentList rents={rents} />
    </div>
  );
};

export default Rent;
