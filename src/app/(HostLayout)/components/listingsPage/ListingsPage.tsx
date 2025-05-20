import React from "react";
import { AiTwotonePlusCircle } from "react-icons/ai";
import Link from "next/link";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { IRent } from "@/types";
import { getAllRents } from "@/services/rents";
import { getAllFlats } from "@/services/flats";
import { getAllLands } from "@/services/land";
import RentList from "./RentList";
import FlatList from "./FlatList";
import LandList from "./LandList";

const ListingsPage = async () => {
  const { data: rents } = await getAllRents();
  const { data: flats } = await getAllFlats();
  const { data: lands } = await getAllLands();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-base">Rent</span>,
      children: <RentTable rents={rents} />,
    },
    {
      key: "2",
      label: <span className="text-base">Flat</span>,
      children: <FlatTable flats={flats} />,
    },
    {
      key: "3",
      label: <span className="text-base">Land</span>,
      children: <LandTable lands={lands} />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          My Listings
        </h1>
        <Link href="/listings/create">
          <button
            type="button"
            className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <AiTwotonePlusCircle className="text-xl" />
            <span className="text-base">Create Listing</span>
          </button>
        </Link>
      </div>

      <Tabs defaultActiveKey="1" items={tabItems} className="text-lg" />
    </div>
  );
};

// Component for Rent Table with larger text
const RentTable = ({ rents }: { rents: IRent[] }) => (
  <RentList rents={rents}></RentList>
);

// Component for Flat Table with larger text
const FlatTable = ({ flats }: { flats: IRent[] }) => (
  <FlatList flats={flats}></FlatList>
);

// Component for Land Table with larger text
const LandTable = ({ lands }: { lands: IRent[] }) => (
  <LandList lands={lands}></LandList>
);

export default ListingsPage;
