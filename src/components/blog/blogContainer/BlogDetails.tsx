



import { formatDate } from '../util/DateTimeFormate';
import { IBlog } from '../types/Blog';
import { apiBaseUrl } from '@/config/config';

interface BlogDetailsProps {
    data: IBlog;
  }
  
const BlogDetails: React.FC<BlogDetailsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto  py-10">
    
      <div className="relative overflow-hidden rounded-2xl shadow-md mb-6 group">
        <img
          src={`${apiBaseUrl}${data.blogImage}` ?? ""}
          alt={data.blogTitle}
          className="w-full h-[70vh] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-500" />
      </div>

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
  );
};

export default BlogDetails;
