import BlogTabs from "@/components/blog/blogContainer/BlogTabs";
import { getAllBlogs, getFeatures } from "@/services/blog";

const BlogMainContainer = async () => {
  const { data: blogs } = await getAllBlogs();
  console.log("blogs data ==", blogs);
  const { data: features } = await getFeatures();

  return (
    <div className="Container py-4">
      <BlogTabs blogs={blogs} features={features} />
    </div>
  );
};

export default BlogMainContainer;
