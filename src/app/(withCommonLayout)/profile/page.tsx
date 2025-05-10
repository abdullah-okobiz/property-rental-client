import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    work: "Senior Software Engineer at Tech Corp",
    location: "San Francisco, CA",
    language: "English, Spanish",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={user.avatar}
                alt="Profile Avatar"
                fill
                className="rounded-full object-cover border-4 border-blue-100 dark:border-gray-600"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {user.name}
            </h2>
          </div>
        </div>

        {/* Details Card */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Personal Information
              </h3>
              <div className="relative group">
                <Link 
                  href="/profile/edit" 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
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
                </Link>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Edit Profile
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-800 transform rotate-45"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-800 dark:text-gray-100">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Work</p>
                <p className="text-gray-800 dark:text-gray-100">{user.work}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-gray-800 dark:text-gray-100">{user.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                <p className="text-gray-800 dark:text-gray-100">{user.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;