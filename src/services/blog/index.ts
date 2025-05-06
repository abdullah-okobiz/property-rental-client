"use server";

import { apiBaseUrl } from "@/config/config";


export const getAllBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/admin/blog`);

  return res.json();
};

export const getFeatures = async()=>{
    const res = await fetch(`${apiBaseUrl}/admin/feature`)
    return res.json()
}