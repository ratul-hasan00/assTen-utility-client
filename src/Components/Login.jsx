import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return "";
  };

  const handlePasswordCheck = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  // ===== SAVE GOOGLE USER TO DATABASE =====
  const saveUserToDB = async (userInfo) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      return await res.json();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // ===== EMAIL/PASSWORD LOGIN =====
  const handleLogin = async () => {
    if (passwordError) return;
    try {
      setLoading(true);
      await signInUser(email, password);
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ===== GOOGLE LOGIN =====
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const loggedUser = result.user;


      // Save to backend just like Register.jsx  
      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        authType: "google",
        createdAt: new Date(),
      };

      await saveUserToDB(userInfo);

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }


  };

  return (<div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200 dark:bg-base-300"> <div className="w-full max-w-md bg-base-100 dark:bg-base-200 shadow-xl rounded-2xl p-8">


    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
      Login to BillHub
    </h2>

    <label className="font-semibold text-base-content">Email</label>
    <input
      type="email"
      placeholder="Enter your email"
      className="input input-bordered w-full mt-1 mb-4 rounded-xl"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label className="font-semibold text-base-content">Password</label>
    <div className="relative mt-1">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="input input-bordered w-full pr-12 rounded-xl"
        value={password}
        onChange={handlePasswordCheck}
      />
      <button
        type="button"
        className="absolute right-3 top-3 text-base-content cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>

    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

    <div className="text-right mt-2">
      <Link to="/forgot" className="text-sm font-medium text-pink-500 hover:underline">Forgot Password?</Link>
    </div>

    <button
      disabled={passwordError || loading}
      onClick={handleLogin}
      className={`w-full mt-5 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 transition-all duration-300 ${passwordError || loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    <div className="my-5 flex items-center justify-center">
      <div className="h-px bg-base-300 w-1/3"></div>
      <span className="px-3 text-sm text-base-content">OR</span>
      <div className="h-px bg-base-300 w-1/3"></div>
    </div>

    {/* Google Login button like Register.jsx */}
    <button
      onClick={handleGoogleLogin}
      className="w-full py-3 border border-base-300 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-base-200 transition-all duration-300"
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
      Login with Google
    </button>

    <p className="text-center mt-6 text-sm text-base-content">
      Don't have an account?
      <Link to="/register" className="text-pink-500 font-semibold ml-1 hover:underline">Register</Link>
    </p>
  </div>
  </div>


  );
};

export default Login;
