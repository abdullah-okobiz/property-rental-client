import { poppins } from "@/app/font";
import { Bed, BedSingle, MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

const RentCard = () => {
  return (
    <div className={`border border-primary rounded ${poppins.className}`}>
      <div className="">
        <Image
          src="https://i.ibb.co.com/tMCphvsc/63cd122a9bfa45fb9f3beb5eeca56f05-Whats-App-Image2025-04-28at5-31-52-PM-1.jpg"
          alt="image"
          width={300}
          height={300}
          className="w-full h-full rounded-t"
        />

        <div>
          <p>
            <span>৳</span>
            <span>2400</span>
            <span>night</span>
          </p>
        </div>
      </div>

      <div className="px-4 py-2">
        <h2 className="line-clamp-1">Ac private Room At Mirpur-1</h2>
        <p>
          <span>
            <MapPin />
          </span>
          <span className="line-clamp-1">
            Sony Hall Gol Chattar, Mirpur Road, Section 1, Mirpur, Dhaka
          </span>
        </p>

        <div>
          <p>
            <span>
              <Bed />
            </span>
            <span>2</span>
            <span>bedroom</span>
          </p>
          <p>
            <span>
              <BedSingle />
            </span>
            <span>3</span>
            <span>bed</span>
          </p>
          <p>
            <span>
              <UserRound />
            </span>
            <span>5</span>
            <span>guest</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentCard;
