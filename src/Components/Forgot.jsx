import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";


const Forgot = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      return toast.error("Please enter your email!");
    }

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200 dark:bg-base-300">
      <div className="w-full max-w-md bg-base-100 dark:bg-base-200 shadow-xl rounded-2xl p-8">
        <title>Forgot Password</title>

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
          Reset Password
        </h2>

        <p className="text-base-content text-center mb-6 text-sm">
          Enter your email and we will send you instructions to reset your password.
        </p>

        <label className="font-semibold text-base-content">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mt-1 mb-4 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="
            w-full mt-2 py-3 text-white font-semibold rounded-xl
            bg-gradient-to-r from-pink-500 via-red-400 to-orange-400
            hover:opacity-90 transition-all duration-300 cursor-pointer
          "
        >
          Send Reset Link
        </button>

        <p className="text-center mt-6 text-sm text-base-content">
          Remember your password?
          <Link to="/login" className="text-pink-500 font-semibold ml-1 hover:underline">
            Go back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
