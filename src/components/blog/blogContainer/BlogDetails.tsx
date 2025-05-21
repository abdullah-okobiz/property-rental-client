import { formatDate } from "../util/DateTimeFormate";
import { IBlog } from "../types";
import { apiBaseUrl } from "@/config/config";
import Image from "next/image";

interface BlogDetailsProps {
  data: IBlog;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ data }) => {
  if (!data) return null;

  console.log("blog details", data);

  return (
    <div className="max-w-6xl mx-auto  py-10 px-3 md:px-6 ">
      <div className="relative overflow-hidden rounded-2xl shadow-sm mb-6 p-2">
        {/* <img
          src={`${apiBaseUrl}${data.blogImage}` ?? ""}
          alt={data.blogTitle}
          className="w-full h-[70vh] object-cover"
        /> */}
        <Image
          src={`${apiBaseUrl}${data.blogImage}`}
          alt=""
          width={700}
          height={700}
        />
      </div>

      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.blogTitle}
        </h1>

        <div className="text-sm text-gray-500 mb-6">
          Published on {formatDate(data.createdAt)}
        </div>

        <article
          className="prose prose-blue max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.blogDescription }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
