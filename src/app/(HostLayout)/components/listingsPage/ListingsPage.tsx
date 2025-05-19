import React from "react";
import { AiTwotonePlusCircle } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { getAllRents } from "@/services/rents";

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  amenities: string[];
  allowableThings: string[];
  cancellationPolicy: string;
  houseRules: string[];
  listingFor: "rent" | "sale";
  location: string;
  price: number;
  image: string;
}

const ListingsPage = async () => {

  const { data: rents } = await getAllRents();
  console.log("Rents", rents);

  const listings: Listing[] = [
    {
      id: "1",
      title: "Modern Downtown Apartment",
      description:
        "Spacious 2-bedroom apartment in the city center with great views",
      category: "Apartment",
      amenities: ["WiFi", "Air Conditioning", "Kitchen", "Washer", "TV"],
      allowableThings: ["Pets allowed", "Smoking allowed"],
      cancellationPolicy: "Flexible - cancel up to 24 hours before check-in",
      houseRules: [
        "No parties",
        "Check-in before 10pm",
        "No unregistered guests",
      ],
      listingFor: "rent",
      location: "New York, NY",
      price: 250,
      image: "/apartment.jpg",
    },
    {
      id: "2",
      title: "Luxury Beachfront Villa",
      description: "Private villa with direct beach access and infinity pool",
      category: "Villa",
      amenities: ["Pool", "Private Beach", "Gym", "Parking", "Hot Tub"],
      allowableThings: ["Pets allowed"],
      cancellationPolicy: "Strict - 50% refund up to 30 days before check-in",
      houseRules: ["No smoking", "Max 8 guests", "Quiet hours after 10pm"],
      listingFor: "sale",
      location: "Miami, FL",
      price: 2500000,
      image: "/villa.jpg",
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
                  Property
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <Image
                          className="h-16 w-16 rounded-md object-cover"
                          src={listing.image}
                          alt={listing.title}
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {listing.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {listing.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {listing.description}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {amenity}
                        </span>
                      ))}
                      {listing.amenities?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{listing.amenities?.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {listing.listingFor === "rent"
                        ? `$${listing.price}/night`
                        : `$${listing.price.toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        listing.listingFor === "rent"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {listing.listingFor === "rent" ? "For Rent" : "For Sale"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/listings/${listing.id}`}>
                      <button className="text-primary hover:text-orange-700 mr-4">
                        View
                      </button>
                    </Link>
                    <Link href={`/listings/${listing.id}/edit`}>
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </button>
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {listings?.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No listings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new listing.
          </p>
          <div className="mt-6">
            <Link href="/listings/create">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <AiTwotonePlusCircle className="-ml-1 mr-2 h-5 w-5" />
                New Listing
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
