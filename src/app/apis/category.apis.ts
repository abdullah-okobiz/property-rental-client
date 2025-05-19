import axiosClient from "@/lib/axios.config";
import { CategoryResponse } from "@/app/(HostLayout)/components/types/category";

const CategoryApis = {
  getCategoriesByFeatureId: (featureId: string) =>
    axiosClient.get<CategoryResponse>(
      `/admin/category?feature_id=${featureId}`
    ),

  updateCategoryForListing: (
    featureType: string,
    listingId: string,
    categoryId: string
  ) =>
    axiosClient.patch(`/host/${featureType}/${listingId}`, {
      category: categoryId,
    }),

  updateTitleForListing: (
    featureType: string,
    listingId: string,
    title: string
  ) => axiosClient.patch(`/host/${featureType}/${listingId}`, { title }),

  updateDescriptionForListing: (
    featureType: string,
    listingId: string,
    description: string
  ) => axiosClient.patch(`/host/${featureType}/${listingId}`, { description }),

  updateLocationForListing: (
    featureType: string,
    listingId: string,
    location: string
  ) => axiosClient.patch(`/host/${featureType}/${listingId}`, { location }),

  updateFloorPlanForListing: (
    featureType: string,
    listingId: string,
    floorPlan: {
      bedroomCount: number;
      bathCount: number;
      bedCount: number;
      guestCount: number;
    }
  ) =>
    axiosClient.patch(`/host/${featureType}/${listingId}`, {
      floorPlan,
    }),
};

export default CategoryApis;
