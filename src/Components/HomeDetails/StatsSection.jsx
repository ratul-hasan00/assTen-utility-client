import React from "react";
import { BarChart3, Users, Receipt, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,245",
    icon: <Users size={32} />,
    gradient: "from-blue-500 via-blue-600 to-blue-700",
  },
  {
    title: "Bills Paid",
    value: "3,680",
    icon: <Receipt size={32} />,
    gradient: "from-green-500 via-green-600 to-green-700",
  },
  {
    title: "Active Categories",
    value: "4",
    icon: <BarChart3 size={32} />,
    gradient: "from-purple-500 via-purple-600 to-purple-700",
  },
  {
    title: "Monthly Transactions",
    value: "920",
    icon: <TrendingUp size={32} />,
    gradient: "from-orange-500 via-orange-600 to-red-600",
  },
];

const StatsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-15">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
        System Statistics
      </h2>
      <p className="text-center text-gray-400 dark:text-gray-200 mb-12 max-w-2xl mx-auto">Our bill statistics give you a clear overview of your monthly activity.
         Track payments, category usage, and overall progress to stay organized and manage your utilities more efficiently.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl text-white shadow-xl bg-gradient-to-br ${item.gradient} transform hover:scale-105 transition duration-500`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-white/80 text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
