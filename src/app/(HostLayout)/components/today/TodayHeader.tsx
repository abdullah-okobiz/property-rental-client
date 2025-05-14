import Link from "next/link";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TodayHeader = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 px-4 sm:px-6 bg-white">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">Welcome Back</h1>
      </div>

      <Link href="/create-listing/become-a-host" passHref>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="!bg-[var(--color-primary)] !border-none !text-white hover:!bg-orange-600 transition"
        >
          Create List
        </Button>
      </Link>
    </div>
  );
};

export default TodayHeader;
