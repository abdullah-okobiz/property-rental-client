import { apiBaseUrl } from "@/config/config";
import { formatDate } from "../util/DateTimeFormate";
import { truncateText } from "../util/truncateText";
import Link from "next/link";

const BlogCard = ({ blog }: any) => {

  return (

    <Link href={`/blogs/${blog._id}`}> 
    <div className=" rounded-2xl cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition duration-300">
    <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-4 group relative">
      <img
        src={`${apiBaseUrl}${blog.blogImage}` ?? ""}
        alt="image"
        width={300}
        height={300}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
  
     <div className="absolute inset-0 bg-gray-400 bg-opacity-40 opacity-20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"></div>
   </div>
      <div className="bg-white text-gray-500">
        <a > {formatDate(blog.createdAt)}</a>
      </div>
      <div className="py-4 bg-white">
        <Link href={`/blogs/${blog._id}`}>
          <h3 className="text-xl font-bold text-blue-400 hover:underline mb-4 line-clamp-2 text-justify ">
            {truncateText(blog.blogTitle, 60)}
          </h3> </Link>

        <div>
          <Link href={`/blogs/${blog._id}`}>
            <button className="flex items-center cursor-pointer gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 transition-colors duration-1300 group-hover:text-white">Read more</span>
              <svg
                className="w-4 h-4 relative z-10 text-blue-600 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>



        </div>
      </div>
    </div>

    </Link>
  );
};

export default BlogCard;
