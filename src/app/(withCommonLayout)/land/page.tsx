"use server";
import RentCard from "@/components/card/RentCard/RentCard";
import LandCategory from "@/components/land/LandCategory/LandCategory";
import { getAllCategory } from "@/services/category";

import { getAllFeature } from "@/services/feature";
import { getAllLands } from "@/services/land";
import { IListingFor, IRent } from "@/types";

const Land = async () => {
  const { data: features } = await getAllFeature();

  const featuresRent = features.find(
    (feature: IListingFor) => feature.featureName === "Land"
  );

  const featuresRentID = featuresRent?._id;

  const { data: rentCategories } = await getAllCategory(featuresRentID);
  const { data: lands } = await getAllLands();
  console.log("find features", featuresRentID);
  return (
    <div className="Container mt-16">
      <LandCategory rentCategories={rentCategories} />

      <div>
        <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {lands?.slice(0, 8).map((rent: IRent) => (
            <RentCard key={rent._id} rent={rent}></RentCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Land;
