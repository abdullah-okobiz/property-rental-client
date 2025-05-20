import BlogTabs from "@/components/blog/blogContainer/BlogTabs";
import { getAllBlogs, getFeatures } from "@/services/blog";
import React from "react";

const page = async () => {
  const { data: blogs } = await getAllBlogs();
  const { data: features } = await getFeatures();
  return (
    <div className="Container py-4">
      <BlogTabs blogs={blogs} features={features} />
    </div>
  );
};

export default page;
