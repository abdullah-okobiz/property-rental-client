"use server";

import { IBlog } from "@/components/blog/types";
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

// export const blogDetails = async (id: string): Promise<BlogRoot> => {
//   const res = await fetch(`${apiBaseUrl}/blog/${id}`);
//   return res.json();
// };

type BlogResponse = {
  data: IBlog;
};

export const blogDetails = async (id: string): Promise<BlogResponse> => {
  const res = await fetch(`${apiBaseUrl}/blog/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog details");
  }

  const json = await res.json();
  return {
    data: json.data,
  };
};

export const getSingleBlogBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};


