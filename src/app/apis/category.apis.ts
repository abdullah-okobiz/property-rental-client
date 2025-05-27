import axiosClient from "@/lib/axios.config";
import { CategoryResponse } from "../(hostLayout)/components/types/category";


const CategoryApis = {
  getCategoriesByFeatureId: (featureId: string) =>
    axiosClient.get<CategoryResponse>(
      `/admin/category?feature_id=${featureId}`
    ),
  getAllAmenitiesProcess: () => axiosClient.get("/admin/amenities"),

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
  updateListingPriceApi: (
    featureType: string,
    listingId: string,
    price: number
  ) => axiosClient.patch(`/host/${featureType}/${listingId}`, { price }),
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
  updateHouseAminitiesForListing: (
    featureType: string,
    listingId: string,
    amenities: string[]
  ) =>
    axiosClient.patch(`/host/${featureType}/${listingId}`, {
      amenities,
    }),
  updateLandForListing: (
    featureType: string,
    listingId: string,
    landSize: number
  ) =>
    axiosClient.patch(`/host/${featureType}/${listingId}`, {
      landSize,
    }),
  getSingleStepTitleFieldForRentListing: (
    featureType: string,
    listingId: string
  ) => axiosClient.get(`/host/${featureType}/${listingId}/field/title`),
  getSingleStepLandFieldForLandListing: (
    featureType: string,
    listingId: string
  ) => axiosClient.get(`/host/${featureType}/${listingId}/field/landSize`),
  getSingleStepLocationFieldForRentListing: (
    featureType: string,
    listingId: string
  ) => axiosClient.get(`/host/${featureType}/${listingId}/field/location`),
  getSingleDescriptionforlistedItem: (featureType: string, listingId: string) =>
    axiosClient.get(`/host/${featureType}/${listingId}/field/description`),
};

export default CategoryApis;
