import FeatureApis from "@/app/apis/feature.apis";

const { getAllFeatures, createNewListing } = FeatureApis;

const FeatureServices = {
  fetchFeatures: async () => {
    try {
      const res = await getAllFeatures();
      return res.data;
    } catch (err) {
      throw new Error("Failed to fetch features");
    }
  },

  createListing: async ({
    featureType,
    featureId,
  }: {
    featureType: string;
    featureId: string;
  }) => {
    try {
      const res = await createNewListing(featureType, featureId);
      return res.data;
    } catch (err) {
      throw new Error("Failed to create listing");
    }
  },
};

export default FeatureServices;
