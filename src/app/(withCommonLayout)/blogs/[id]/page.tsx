import BlogDetails from "@/components/blog/blogContainer/BlogDetails";
import { IBlog } from "@/components/blog/types/Blog";
import { blogDetails } from "@/services/blog";
import { CloudCog } from "lucide-react";
import { Fragment } from "react";

interface BlogDetailsPageProps {
  params: { id: string }; 
}

const BlogDetailsContainer = async ({ params }: BlogDetailsPageProps) => {
  const { id } = params;

  const { data: blogsDetailsData }: { data: IBlog } = await blogDetails(id);
  console.log(blogsDetailsData,"=========================")

  return (
    <Fragment>
      <BlogDetails data={blogsDetailsData} />
    </Fragment>
  );
};

export default BlogDetailsContainer;
