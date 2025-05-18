
import CategoryApis from "@/app/apis/category.apis";

const {
  getCategoriesByFeatureId,
  updateCategoryForListing,
  updateTitleForListing,
} = CategoryApis;

const CategoryServices = {
  fetchCategories: async (featureId: string) => {
    try {
      const res = await getCategoriesByFeatureId(featureId);
      return res.data;
    } catch (err) {
      throw new Error("Failed to fetch categories");
    }
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
    try {
      const res = await updateCategoryForListing(
        featureType,
        listingId,
        categoryId
      );
      console.log(res, "category result");
      return res.data;
    } catch (err) {
      throw new Error("Failed to update listing category");
    }
  },

  updateListingTitle: async (
    featureType: string,
    listingId: string,
    title: string
  ) => {
    try {
      const res = await updateTitleForListing(featureType, listingId, title);
      return res.data;
    } catch (error) {
      throw new Error("Failed to update listing title");
    }
  },
};

export default CategoryServices;
