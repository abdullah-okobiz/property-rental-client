"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useListingContext } from "@/contexts/ListingContext";
import { useListingStepContext } from "@/contexts/ListingStepContext";
import CategoryServices from "@/services/category/category.services";

export default function PriceSetter() {
  const [price, setPrice] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const guestFee = 0;
  const total = price + guestFee;
  const { listingId, featureType } = useListingContext();
  const { setOnNextSubmit } = useListingStepContext();

  // useEffect(() => {
  //   const fetchTitle = async () => {
  //     if (!listingId || !featureType) return;
  //     try {
  //       const res = await CategoryServices.getListingPrice(
  //         featureType,
  //         listingId
  //       );
  //       console.log(res, "response title ");
  //       //  setTitle(res?.data?.title || "");
  //     } catch (error) {
  //       console.error("Error fetching title:", error);
  //     }
  //   };
  //   fetchTitle();
  // }, [listingId, featureType]);

  const handleSubmit = async () => {
    if (!listingId || !featureType) return;
    const res = await CategoryServices.updateListingPrice(
      featureType,
      listingId,
      price
    );
    console.log("result price ", res);
  };

  useEffect(() => {
    setOnNextSubmit(handleSubmit);
  }, [price, listingId, featureType]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Now, set your price</h2>
        <p className="text-gray-500">You can change it anytime</p>
      </div>

      <div className="relative text-4xl font-bold flex items-center">
        {editing ? (
          <input
            type="number"
            className="text-center border-b-2 border-primary w-28 outline-none"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            onBlur={() => setEditing(false)}
            autoFocus
          />
        ) : (
          <>
            ৳{price}
            <button
              onClick={() => setEditing(true)}
              className="ml-2 text-gray-500 hover:text-black"
            >
              <Pencil size={18} />
            </button>
          </>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="border rounded-xl p-4 w-64 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base price</span>
          <span>৳{price}</span>
        </div>
        <div className="flex justify-between">
          <span>Guest Gateway fee</span>
          <span>৳{guestFee}</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <span>Total Guest price</span>
          <span>৳{total}</span>
        </div>
      </div>

      {/* You Earn */}
      <div className="bg-gray-100 rounded-xl p-3 px-4 font-medium">
        <span>You earn </span>
        <span>৳{price}</span>
      </div>
    </div>
  );
}
