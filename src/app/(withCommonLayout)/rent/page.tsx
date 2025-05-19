// app/rent/page.tsx
"use server";

import RentCard from "@/components/card/RentCard/RentCard";
import RentCategory from "@/components/rent/RentCategory/RentCategory";
import { getAllCategory } from "@/services/category";
import { getAllFeature } from "@/services/feature";
import { getAllRents } from "@/services/rents";
import { IListingFor, IRent } from "@/types";

interface RentProps {
  searchParams: { category?: string };
}

const Rent = async ({ searchParams }: RentProps) => {
  const { data: features } = await getAllFeature();
  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Rent"
  );
  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);

  const categoryId = searchParams.category;
  const { data: rents } = await getAllRents({
    category: categoryId !== "all" ? categoryId : undefined,
  });

  return (
    <div className="Container mt-16">
      <RentCategory
        rentCategories={rentCategories}
        selectedCategoryId={categoryId || "all"}
      />

      <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {rents?.slice(0, 8).map((rent: IRent) => (
          <RentCard key={rent._id} rent={rent} linkPrefix="rent" />
        ))}
      </div>
    </div>
  );
};

export default Rent;
