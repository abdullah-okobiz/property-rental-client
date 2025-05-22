import axiosClient from "@/lib/axios.config";

const ListingImageApis = {
  uploadImage: (featureType: string, listingId: string, formData: FormData) =>
    axiosClient.patch(`/host/${featureType}/image/${listingId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteImage: (featureType: string, listingId: string) =>
    axiosClient.delete(`/host/${featureType}/image/${listingId}`),
};

export default ListingImageApis;
