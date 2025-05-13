import { Tabs } from 'antd';
import RentSearchInputField from './RentSearchInputField';
import LandSearchInputField from './LandSearchInputField';
import FlatSearchInputField from './FlatSearchInputField';

const SearchTabs = () => {
  const tabClass = "text-white bg-[#F2693C] px-4 py-2 rounded";

  const items = [
    {
      key: "rent",
      label: <div className={tabClass}>Rent</div>,
      children: <RentSearchInputField />,
    },
    {
      key: "land",
      label: <div className={tabClass}>Land</div>,
      children: <LandSearchInputField />,
    },
    {
      key: "flat",
      label: <div className={tabClass}>Flat</div>,
      children: <FlatSearchInputField />,
    },
  ];

  return <Tabs defaultActiveKey="rent" type="card" items={items} />;
};

export default SearchTabs;
