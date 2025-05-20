import Link from "next/link";
import { AiTwotonePlusCircle } from "react-icons/ai";

const TodayHeader = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 px-4 sm:px-6 bg-white">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
          Welcome Back
        </h1>
      </div>

      <Link href="/create-listing/become-a-host">
        <button
          type="button"
          className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          <AiTwotonePlusCircle className="text-xl" />
          <span> Create List</span>
        </button>
      </Link>
    </div>
  );
};

export default TodayHeader;
