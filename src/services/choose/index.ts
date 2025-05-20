"use server";

import { apiBaseUrl } from "@/config/config";

export const getAllChoose = async () => {
  const res = await fetch(`${apiBaseUrl}/why-choose-us`);

  return res.json();
};

// export const getFeatures = async()=>{
//     const res = await fetch(`${apiBaseUrl}/admin/feature`)
//     return res.json()
// }
// export const blogDetails = async (id:string)=>{
//   const res= await fetch(`${apiBaseUrl}/admin/blog/${id}`)
//   return res.json()
// }
