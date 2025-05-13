"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    work: "Senior Software Engineer at Tech Corp",
    location: "San Francisco, CA",
    language: "English, Spanish",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the user data
    console.log("Updated user data:", user);
    router.push("/profile");
  };

  return (
    // <div className="container mx-auto py-10 px-4 max-w-md">
    //   <h1 className="text-2xl text-gray-700 font-bold mb-6 text-center">Edit Profile</h1>

    //   <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    //     {Object.entries(user).map(([key, value]) => (
    //       <div key={key} className="mb-4">
    //         <label className="block text-gray-700 dark:text-gray-300 mb-2 capitalize">
    //           {key}
    //         </label>
    //         <input
    //           type={key === 'email' ? 'email' : 'text'}
    //           name={key}
    //           value={value}
    //           onChange={handleChange}
    //           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
    //         />
    //       </div>
    //     ))}

    //     <div className="flex justify-end space-x-3 mt-6">
    //       <button
    //         type="button"
    //         onClick={() => router.push("/profile")}
    //         className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    //       >
    //         Save Changes
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
      <div className="flex">
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default EditProfilePage;
