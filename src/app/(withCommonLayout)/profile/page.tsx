

import VerificationModal from "@/components/modals/VerificationModal";
// import GettingToken from "@/components/profile/GettingToken";
// import useAccess from "@/hooks/useAccess";
import {
  getProfileAvatar,
  getProfileBio,
  getProfileLanguage,
  getProfileLocation,
  getProfileWork,
} from "@/services/profile";
import Image from "next/image";
import Link from "next/link";
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

const ProfilePage = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhcmhhbi5va29iaXpAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwicm9sZSI6Imd1ZXN0IiwidXNlcklkIjoiNjgyMzFmZGY4MDNiOWM4NzU3YWIxYmUzIiwibmFtZSI6ImZhcmhhbiIsImFjY291bnRTdGF0dXMiOiJpbmFjdGl2ZSIsImlhdCI6MTc0NzEzODA1NCwiZXhwIjoxNzQ3NzQyODU0fQ.U5cyP_5iNISpqe4_pkRkwNbFcIObevO-kqyjTL5GiO4";

  const decoded = jwtDecode<DecodedToken>(token);

  const user = {
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    isVerified: decoded.isVerified,
    accountStatus: decoded.accountStatus,
    work: "",
    location: "",
    language: "",
    avatar: "",
    about: "",
  };

  const [userProfile, userLocation, userLanguage, userBio, userAvatar] =
    await Promise.all([
      getProfileWork(token),
      getProfileLocation(token),
      getProfileLanguage(token),
      getProfileBio(token),
      getProfileAvatar(token),
    ]);

  user.avatar = userAvatar?.data?.avatar || "";
  user.work = userProfile?.data?.worksAt || "";
  user.location = userLocation?.data?.location || "";
  user.language = userLanguage?.data?.languages?.join(", ") || "";
  user.about = userBio?.data?.intro || "Nothing to say";

  return (
    <>
      <div className="container mx-auto py-30 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-all border border-black/10">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={process.env.NEXT_PUBLIC_API_BASE_URL + user.avatar}
                  alt="Profile Avatar"
                  fill
                  className="rounded-full object-cover border-4 border-blue-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="text-3xl font-normal text-gray-800 capitalize">
                {user.name}
              </div>
              <div className="text-sm font-bold text-gray-800">Guest</div>
            </div>
          </div>

          {/* Details Section (No Card) */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <h3 className="text-3xl font-bold text-gray-700 capitalize">
                  About {user.name}
                </h3>
                <div className="relative group p-2 border-1 border-gray-600 rounded-lg">
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                    aria-label="Edit profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span className="text-sm font-medium">Edit Profile</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Work</p>
                    <p className="text-gray-800">
                      {user?.work}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-gray-800">
                      {user?.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Language</p>
                    <p className="text-gray-800">
                      {user.language}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-800">
                {user?.about ? user?.about : "Nothing to say"}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 mt-10">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-start transition-all border border-black/10">
              <div className="text-xl font-semibold text-gray-800 mb-4">
                {user.name}&#39;s confirmed information
              </div>

              <div className="space-y-3 w-full">
                <div className="flex items-center gap-2">
                  <div className="bg-primary p-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Email verified</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary p-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">National ID verified</span>
                </div>
              </div>

              <VerificationModal></VerificationModal>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
