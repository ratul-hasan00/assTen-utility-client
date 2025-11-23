import React, { useContext } from "react";
import { Link } from "react-router";
import { Calendar, Key, User, CheckCircle2 } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-base-200 dark:bg-base-300 px-4 py-12">
      <div className="max-w-3xl w-full bg-base-100 dark:bg-base-200 shadow-2xl rounded-3xl p-8 flex flex-col md:flex-row gap-8">

        {/* Left: Profile Photo and Info */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="User"
            className="w-36 h-36 rounded-full border-4 border-pink-400 shadow-xl object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-base-content">
            {user?.displayName || "Anonymous User"}
          </h2>
          <p className="text-sm text-base-content/70 mt-1">{user?.email}</p>
          <Link
            to="/editProfile"
            className="mt-4 py-2 px-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 p-4 rounded-xl shadow">
            <Key className="text-pink-500" />
            <div>
              <p className="text-sm text-base-content/70">User ID</p>
              <p className="font-semibold text-base-content">{user?.uid}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 p-4 rounded-xl shadow">
            <Calendar className="text-orange-500" />
            <div>
              <p className="text-sm text-base-content/70">Account Created</p>
              <p className="font-semibold text-base-content">{createdAt}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 p-4 rounded-xl shadow">
            <CheckCircle2 className="text-green-500" />
            <div>
              <p className="text-sm text-base-content/70">Bills Paid</p>
              <p className="font-semibold text-base-content">12</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 p-4 rounded-xl shadow">
            <User className="text-blue-500" />
            <div>
              <p className="text-sm text-base-content/70">User Role</p>
              <p className="font-semibold text-base-content">Standard User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
