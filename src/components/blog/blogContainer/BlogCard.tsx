import { apiBaseUrl } from "@/config/config";

const BlogCard = ({ blog }:any) => {


  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
    <img
      src={`${apiBaseUrl}${blog.blogImage}` ?? ""}
      alt="image"
      width={300}
      height={300}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="p-4 bg-white">
    <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
      {blog.blogTitle}
    </h3>
    <div>
      <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium transition hover:bg-blue-600 hover:text-white group">
        Read more
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>

  );
};

export default BlogCard;
