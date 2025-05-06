



import { formatDate } from '../util/DateTimeFormate';
import { IBlog } from '../types/Blog';
import { apiBaseUrl } from '@/config/config';

interface BlogDetailsProps {
    data: IBlog;
  }
  
const BlogDetails: React.FC<BlogDetailsProps> = ({ blogImage,blogTitle ,createdAt,blogDescription}) => {
 

  return (
    <div className="max-w-6xl mx-auto  py-10">
    
      <div className="relative overflow-hidden rounded-2xl shadow-md mb-6 group">
        <img
          src={`${apiBaseUrl}${blogImage}` ?? ""}
          alt={blogTitle}
          className="w-full h-[70vh] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-500" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {blogTitle}
      </h1>

    
      <div className="text-sm text-gray-500 mb-6">
        Published on {formatDate(createdAt)}
      </div>

      <article
        className="prose prose-blue max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: blogDescription }}
      />
    </div>
  );
};

export default BlogDetails;
