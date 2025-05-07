import BlogTabs from "@/components/blog/blogContainer/BlogTabs";
import { getAllBlogs, getFeatures } from "@/services/blog";


const BlogMainContainer = async () => {
  const { data: blogs } = await getAllBlogs();
  const { data: features } = await getFeatures()


  return (
    <div  className=" w-full py-4">
      <BlogTabs blogs={blogs} features={features} />
    </div>
  );
};

export default BlogMainContainer;
