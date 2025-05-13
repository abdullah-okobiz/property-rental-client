"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ProfileEditForm = () => {
  const [profileData, setProfileData] = useState({
    email: "user@example.com",
    work: "Software Developer",
    location: "New York, USA",
    language: "English",
    description:
      "Passionate developer with 5+ years of experience building web applications.",
    image: "/default-profile.jpg",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleFieldClick = (field) => {
    setEditingField(field);
    setTempValue(profileData[field]);
  };

  const handleSave = () => {
    setProfileData((prev) => ({
      ...prev,
      [editingField]: tempValue,
    }));
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = () => {
    if (imagePreview) {
      setProfileData((prev) => ({
        ...prev,
        image: imagePreview,
      }));
    }
    setShowImageModal(false);
    setImagePreview("");
  };

  return (
    <div className="text-gray-800 container mx-auto py-20 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Profile Image */}
        <div className="w-full md:w-1/3">
          <div className="relative group">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={profileData.image}
                alt="Profile"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setShowImageModal(true)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-md cursor-pointer"
            >
              Edit Picture
            </button>
          </div>
        </div>

        {/* Right Column - Profile Info */}
        <div className="w-full md:w-2/3">
          <div className="mb-4 text-3xl font-semibold">Your Profile</div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {["email", "work", "location", "language"].map((field) => (
              <div
                key={field}
                onClick={() => handleFieldClick(field)}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
              >
                <div className="text-sm text-gray-500 capitalize">{field}</div>
                <div className="font-medium mt-1">
                  {profileData[field] || `Add your ${field}`}
                </div>
              </div>
            ))}
          </div>

          {/* About You Section */}
          <div className="mb-2 font-medium">About You</div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <p>{profileData.description}</p>
          </div>
          <button
            onClick={() => handleFieldClick("description")}
            className="text-primary hover:text-blue-800 cursor-pointer underline"
          >
            Edit Description
          </button>
        </div>
      </div>

      {/* Done Button */}
      <div className="mt-8 flex justify-end">
        <Link href="/profile">
          <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
            Done
          </button>
        </Link>
      </div>

      {/* Edit Field Modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4 capitalize">
              Edit {editingField}
            </h3>
            {editingField === "description" ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="5"
              />
            ) : (
              <input
                type={editingField === "email" ? "email" : "text"}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 border border-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Edit Profile Picture</h3>
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                <Image
                  src={imagePreview || profileData.image}
                  alt="Profile Preview"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveImage}
                className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditForm;
