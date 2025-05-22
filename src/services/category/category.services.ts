
import { CategoryResponse } from "@/app/(hostLayout)/components/types/category";
import CategoryApis from "@/app/apis/category.apis";

const {
  getCategoriesByFeatureId,
  updateCategoryForListing,
  updateTitleForListing,
  updateDescriptionForListing,
  updateLocationForListing,
  updateFloorPlanForListing,
} = CategoryApis;

const CategoryServices = {
  fetchCategories: async (featureId: string): Promise<CategoryResponse> => {
    const res = await getCategoriesByFeatureId(featureId);
    return res.data;
  },

  setListingCategory: async ({
    featureType,
    listingId,
    categoryId,
  }: {
    featureType: string;
    listingId: string;
    categoryId: string;
  }) => {
    const res = await updateCategoryForListing(
      featureType,
      listingId,
      categoryId
    );
    return res.data;
  },

  updateListingTitle: async (
    featureType: string,
    listingId: string,
    title: string
  ) => {
    const res = await updateTitleForListing(featureType, listingId, title);
    return res.data;
  },

  updateListingDescription: async (
    featureType: string,
    listingId: string,
    description: string
  ) => {
    const res = await updateDescriptionForListing(
      featureType,
      listingId,
      description
    );
    return res.data;
  },

  updateListingLocation: async (
    featureType: string,
    listingId: string,
    location: string
  ) => {
    const res = await updateLocationForListing(
      featureType,
      listingId,
      location
    );
    return res.data;
  },

  processUpdateFloorPlan: async (
    featureType: string,
    listingId: string,
    floorPlan: {
      bedroomCount: number;
      bathCount: number;
      bedCount: number;
      guestCount: number;
    }
  ) => {
    const res = await updateFloorPlanForListing(
      featureType,
      listingId,
      floorPlan
    );
    return res.data;
  },
};

export default CategoryServices;
