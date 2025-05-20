import React from "react";
import { AiTwotonePlusCircle } from "react-icons/ai";
// import Image from "next/image";
import Link from "next/link";
import { getAllRents } from "@/services/rents";
import { IRent } from "@/types";
// import { getAllFlats } from "@/services/flats";

// interface Listing {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   amenities: string[];
//   allowableThings: string[];
//   cancellationPolicy: string;
//   houseRules: string[];
//   listingFor: "rent" | "sale";
//   location: string;
//   price: number;
//   image: string;
// }

const ListingsPage = async () => {
  const { data: rents } = await getAllRents();
  // const { data: flat } = await getAllFlats();
  // const { data: land } = await getAllRents();
  console.log("Rents", rents);

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
            <span>Create Listing</span>
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bedrooms
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Beds
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Baths
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rents.map((rent : IRent) => (
                <tr key={rent?._id} className="hover:bg-gray-50 transition">
                  {/* Your table row content here */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {rent?.title || "No title"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {rent?.status?.replace(/_/g, " ") || "No Status"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {rent?.floorPlan?.bedroomCount}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {rent?.floorPlan?.bedCount}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {rent?.floorPlan?.bathCount}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {rent?.location}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
