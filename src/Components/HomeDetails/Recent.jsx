// Recent.jsx
import React, { useContext, useEffect, useState, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router";

const Recent = () => {
  const [bills, setBills] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/bills")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBills(sorted.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-gray-500 dark:text-gray-300">Loading...</span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-gray-100">
        Recent Bills
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Keep track of your latest bills and quickly access details for easy management.
      </p>

      <Suspense
        fallback={
          <LoadingSpinner></LoadingSpinner>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="relative flex flex-col rounded-3xl overflow-hidden transform transition duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f3ec78 0%, #af4261 100%)",
              }}
            >
              {/* Image with rounded & smaller size to show gradient around */}
              <div className="flex justify-center mt-4">
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-gray-800"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col justify-between p-6 flex-1">
                <div className="space-y-2 mt-4">
                  <h3 className="text-lg md:text-xl font-bold text-white dark:text-white">
                    {bill.title}
                  </h3>
                  <p className="text-sm text-white/90 dark:text-white/80">
                    Category: <span className="font-semibold">{bill.category}</span>
                  </p>
                  <p className="text-sm text-white/90 dark:text-white/80">
                    Location: <span className="font-semibold">{bill.location}</span>
                  </p>
                  <p className="text-sm text-white/90 dark:text-white/80">
                    Date: <span className="font-semibold">{bill.date}</span>
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  {user ? (
                    <NavLink
                      to={`/bills/${bill._id}`}
                      className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white py-2 px-4 rounded-lg font-semibold hover:scale-105 transition duration-300 text-center w-full"
                    >
                      View Details
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white py-2 px-4 rounded-lg font-semibold hover:scale-105 transition duration-300 text-center w-full"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </section>
  );
};

export default Recent;
