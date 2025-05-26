"use server";
import BlogTabs from "@/components/blog/blogContainer/BlogTabs";
import { getAllBlogs, getFeatures } from "@/services/blog";
import { BlogData, Feature } from "@/types/blogTypes/blogTypes";

const BlogMainContainer = async () => {
  const { data: blogs }: { data: BlogData[] } = await getAllBlogs();
  const { data: features }: { data: Feature[] } = await getFeatures();

  return (
    <div className="Container py-4">
      <BlogTabs blogs={blogs} features={features} />
    </div>
  );
};

export default BlogMainContainer;
