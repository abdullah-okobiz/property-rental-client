"use server";

import { apiBaseUrl } from "@/config/config";
import { BlogRoot, FeatureRoot } from "@/types/blogTypes/blogTypes";

export const getAllBlogs = async (): Promise<BlogRoot> => {
  const res = await fetch(`${apiBaseUrl}/blog`);
  return res.json();
};

export const getFeatures = async (): Promise<FeatureRoot> => {
  const res = await fetch(`${apiBaseUrl}/admin/feature`);
  return res.json();
};

export const blogDetails = async (id: string): Promise<BlogRoot> => {
  const res = await fetch(`${apiBaseUrl}/blog/${id}`);
  return res.json();
};
