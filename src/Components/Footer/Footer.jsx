import React from "react";
import { Link } from "react-router";
import logo from '../../assets/logo (2).png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        <div className="flex flex-col items-center md:items-start space-y-5">
          <Link to="/" className="flex items-center gap-4 justify-center md:justify-start">
            <img src={logo} alt="BillHub Logo" className="w-16 h-16 rounded-xl object-cover" />
            <span className="text-3xl font-bold text-white">BillHub</span>
          </Link>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs md:max-w-full">
            BillHub makes managing your utility bills simple and secure, keeping everything organized in one place.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="font-bold text-2xl text-white mb-3">Useful Links</h3>
          <Link to="/" className="hover:underline hover:text-white/90 transition">Home</Link>
          <Link to="/bills" className="hover:underline hover:text-white/90 transition">Bills</Link>
          <Link to="/login" className="hover:underline hover:text-white/90 transition">Login</Link>
          <Link to="/register" className="hover:underline hover:text-white/90 transition">Register</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="font-bold text-2xl text-white mb-3">Contact</h3>
          <p className="text-white/80">Email: hayena@billhub.com</p>
          <p className="text-white/80">Phone: +880 123 456 789</p>
          <p className="text-white/80">Address: 123 Main Street, Dhaka, Bangladesh</p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="font-bold text-2xl text-white mb-3">More Info</h3>
          <Link to="/privacy" className="hover:underline hover:text-white/90 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline hover:text-white/90 transition">Terms & Conditions</Link>
          <Link to="/about" className="hover:underline hover:text-white/90 transition">About Us</Link>
        </div>

      </div>

      <div className="mt-12 border-t border-white/30 pt-5 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} BillHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
