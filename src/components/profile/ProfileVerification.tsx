"use client";

import React, { useEffect, useState } from "react";
// import VerificationModal from "../modals/VerificationModal";
import Link from "next/link";
import { getUser } from "@/services/auth/auth.service";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  isVerified: boolean;
  role: string;
  userId: string;
  name: string;
  accountStatus: string;
  iat: number;
  exp: number;
}

const ProfileVerification = () => {
  const [isVerified, setIsVerified] = useState<string | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      const token = await getUser();
      if (!token) return;

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setIsVerified(decoded.accountStatus);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    };

    checkVerification();
  }, []);

  if (isVerified === null) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 mt-10">
      <div className="md:col-span-1">
        <div className="bg-white rounded-2xl p-6 flex flex-col items-start transition-all border border-black/10">
          {isVerified === "active" ? (
            <div className="text-xl font-semibold text-green-600">
              ✅ Your Profile is Verified
            </div>
          ) : isVerified === "pending" ? (
            <div className="text-xl font-semibold text-yellow-600">
              ⏳ Your Profile is Under Review
            </div>
          ) : (
            <>
              <div className="text-xl font-semibold text-red-600">
                ❌ Your Profile is Not Verified
              </div>

              {/* <VerificationModal /> */}

              <div className="text-xl text-gray-700 mt-5 font-semibold">
                Verify your identity
              </div>
              <div className="text-gray-700 mt-5 text-sm font-semibold">
                Before you book or Host on HomezyStay, you will need to complete
                this step.
              </div>
              <div className="relative group p-2 border border-gray-600 rounded-lg mt-5 transition-transform transform hover:scale-105 hover:border-blue-500 duration-300">
                <Link
                  href="/profile/verification"
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-300 cursor-pointer px-5 py-2 inline-block"
                  aria-label="Get Verified"
                >
                  <span className="text-lg text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    Get Verified
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileVerification;
