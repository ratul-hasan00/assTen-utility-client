import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, NavLink } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(true);
  const [category, setCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const categories = [
    "All",
    "Electricity",
    "Gas",
    "Water",
    "Internet",
    "Education",
    "Recharge",
  ];

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoadingBills(true);
        let url = "https://ass-ten-utility-server.vercel.app/bills";
        if (category && category !== "All") {
          url += `?category=${encodeURIComponent(category)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setBills(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBills(false);
      }
    };

    fetchBills();
  }, [category]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (authLoading || loadingBills) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
      <title>Bills</title>

      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        All Bills
      </h2>

      {/* 🔽 FILTER DROPDOWN */}
      <div
        className="relative mb-6 z-50"
        ref={dropdownRef}
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="p-3 px-4 rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white font-semibold shadow-lg hover:scale-105 transform transition duration-300 flex items-center justify-between w-48"
        >
          {category}
          <svg
            className={`h-4 w-4 ml-2 transform transition-transform ${dropdownOpen ? "rotate-180" : ""
              }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.422a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute mt-2 w-48 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 rounded-xl shadow-lg overflow-hidden z-[9999]">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 cursor-pointer text-white hover:bg-red-500 transition duration-300"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔽 BILL CARDS */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        data-aos="zoom-in"
        data-aos-duration="1800"
      >
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="relative flex flex-col rounded-3xl overflow-hidden transform transition duration-500 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #f3ec78 0%, #af4261 100%)",
            }}
          >
            <div className="flex justify-center mt-4">
              <img
                src={bill.image}
                alt={bill.title}
                className="w-36 h-36 object-cover rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>

            <div className="flex flex-col justify-between p-6 flex-1">
              <div className="space-y-2 mt-4">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {bill.title}
                </h3>
                <p className="text-sm text-white">
                  Category:{" "}
                  <span className="font-semibold">{bill.category}</span>
                </p>
                <p className="text-sm text-white">
                  Location:{" "}
                  <span className="font-semibold">{bill.location}</span>
                </p>
                <p className="text-sm text-white">
                  Date: <span className="font-semibold">{bill.date}</span>
                </p>
                <p className="text-sm text-white">
                  Amount:{" "}
                  <span className="font-semibold">${bill.amount}</span>
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                {user ? (
                  <NavLink
                    to={`/billsdetails/${bill._id}`}
                    className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white py-2 px-4 rounded-lg font-semibold hover:scale-105 transition duration-300 text-center w-full"
                  >
                    See Details
                  </NavLink>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white py-2 px-4 rounded-lg font-semibold hover:scale-105 transition duration-300 text-center w-full"
                  >
                    See Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bills;
