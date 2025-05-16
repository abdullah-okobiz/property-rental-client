import CategoryApis from "@/app/apis/category.apis";


const {
  getCategoriesByFeatureId,
  updateCategoryForListing,
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
      const res = await updateCategoryForListing(featureType, listingId, categoryId);
      return res.data;
    } catch (err) {
      throw new Error("Failed to update listing category");
    }
  },
};

export default CategoryServices;
