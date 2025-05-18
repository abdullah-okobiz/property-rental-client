// src/app/apis/category.apis.ts
import axiosClient from "@/lib/axios.config";

const CategoryApis = {
  getCategoriesByFeatureId: (featureId: string) =>
    axiosClient.get(`/admin/category?feature_id=${featureId}`),

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
  ) =>
    axiosClient.patch(`/host/${featureType}/${listingId}`, {
      title,
    }),
};

export default CategoryApis;
