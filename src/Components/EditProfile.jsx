import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const EditProfile = () => {
  const { user, updateUserProfile, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setLoading(true);

    try {
      await updateUserProfile({ displayName, photoURL });

      const updatedUser = {
        name: displayName,
        photoURL: photoURL,
      };

      await fetch(`https://ass-ten-utility-server.vercel.app/users/${user?.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
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
      <title>Edit Profile</title>
      <div className="w-full max-w-md bg-base-100 dark:bg-base-200 shadow-xl rounded-3xl p-8" data-aos="zoom-in"
        data-aos-duration="1000">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text" data-aos="fade-right"
          data-aos-duration="1200">
          Edit Profile
        </h2>

        <div className="flex justify-center mb-4" data-aos="fade-left"
          data-aos-duration="1200">
          <img
            src={
              photoURL ||
              user?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border-4 border-pink-400 shadow-lg object-cover"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          <div data-aos="zoom-out"
            data-aos-duration="1200">
            <label className="font-semibold text-base-content">Full Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full mt-1 rounded-xl"
              required
            />
          </div>

          <div data-aos="zoom-out"
            data-aos-duration="1400">
            <label className="font-semibold text-base-content">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full mt-1 rounded-xl"
            />
          </div>

          <button

            type="submit"
            disabled={updating}
            className={`w-full py-3 text-white font-semibold rounded-xl
            bg-gradient-to-r from-pink-500 via-red-400 to-orange-400
            transition-all duration-300 cursor-pointer
            ${updating
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
              }`}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
