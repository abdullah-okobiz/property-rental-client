"use client";
import Tabs from "./Tabs";
import BlogList from "./BlogList";
import { useState } from "react";
import { BlogData, Feature } from "@/types/blogTypes/blogTypes";

interface BlogTabsProps {
  blogs: BlogData[];
  features: Feature[];
}

const BlogTabs = ({ blogs, features }: BlogTabsProps) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", ...features.map((f) => f.featureName)];

  const filteredBlogs =
    activeTab === "All"
      ? blogs
      : blogs.filter((blog) => blog.feature?.featureName === activeTab);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default BlogTabs;
