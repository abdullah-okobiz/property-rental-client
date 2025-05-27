import axiosClient from "@/lib/axios.config";
import { FeatureResponse } from "../(hostLayout)/components/types/feature";
import { ListingResponse } from "../(hostLayout)/components/types/listing";



const FeatureApis = {
  getAllFeatures: () => axiosClient.get<FeatureResponse>("/admin/feature"),

  createNewListing: (featureType: string, featureId: string) =>
    axiosClient.post<ListingResponse>(`/host/${featureType}/new`, {
      listingFor: [featureId],
    }),
};

export default FeatureApis;
