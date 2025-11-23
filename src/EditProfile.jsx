import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { auth, updateProfile } from "firebase/auth";
import { AuthContext } from "./Context/AuthContext";

const EditProfile = () => {
  const { user, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-base-300 px-4 py-12">
      <div className="w-full max-w-md bg-base-100 dark:bg-base-200 shadow-xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
          Edit Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          {/* Display Name */}
          <div>
            <label className="font-semibold text-base-content">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full mt-1 rounded-xl"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-semibold text-base-content">Photo URL</label>
            <input
              type="text"
              placeholder="Enter photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full mt-1 rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updating}
            className={`w-full py-3 text-white font-semibold rounded-xl
              bg-gradient-to-r from-pink-500 via-red-400 to-orange-400
              transition-all duration-300 cursor-pointer
              ${updating ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
            `}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
