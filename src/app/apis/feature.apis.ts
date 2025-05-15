import axiosClient from "@/lib/axios.config";

const FeatureApis = {
  getAllFeatures: () => axiosClient.get("/admin/feature"),

  createNewListing: (featureType: string, featureId: string) =>
    axiosClient.post(`/host/${featureType}/new`, {
      listingFor: [featureId],
    }),
};

export default FeatureApis;
