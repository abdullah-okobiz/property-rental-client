import BlogDetails from "@/components/blog/blogContainer/BlogDetails";
import { blogDetails } from "@/services/blog";
import { IBlog } from "@/components/blog/types";
import React, { Fragment } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogDetailsContainer: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const { data: blogsDetailsData }: { data: IBlog } = await blogDetails(
    resolvedParams.id
  );

  return (
    <Fragment>
      <BlogDetails data={blogsDetailsData} />
    </Fragment>
  );
};

export default BlogDetailsContainer;
