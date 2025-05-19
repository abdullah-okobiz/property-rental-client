import BlogCard from "./BlogCard";

const BlogList = ({ blogs }: any) => {
  if (!blogs?.length) {
    return <p className="text-gray-500">No blogs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {blogs.map((blog: any) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
