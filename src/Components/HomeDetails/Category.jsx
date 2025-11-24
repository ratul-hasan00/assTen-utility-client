import React from "react";
import { Link } from "react-router";
import electricityIcon from "../../assets/electricity2.jpg";
import gasIcon from "../../assets/gas2.png";
import waterIcon from "../../assets/water2.webp";
import internetIcon from "../../assets/internet2.webp";

const categories = [
{
name: "Electricity",
icon: electricityIcon,
gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
path: "/bills?category=Electricity",
},
{
name: "Gas",
icon: gasIcon,
gradient: "from-red-400 via-red-500 to-red-600",
path: "/bills?category=Gas",
},
{
name: "Water",
icon: waterIcon,
gradient: "from-blue-400 via-blue-500 to-blue-600",
path: "/bills?category=Water",
},
{
name: "Internet",
icon: internetIcon,
gradient: "from-purple-400 via-purple-500 to-purple-600",
path: "/bills?category=Internet",
},
];

const Category = () => {
return ( <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20"> <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
Explore Categories </h2> <p className="text-center text-gray-400 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
Choose from our main utility categories to manage your bills efficiently.
Click any category to view detailed information and stay on top of your payments! </p>


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {categories.map((cat) => (
      <Link
        key={cat.name}
        to={cat.path}
        className="group relative flex flex-col items-center justify-center p-6 rounded-3xl overflow-hidden transform transition duration-500 hover:scale-105"
      >
        {/* Contained gradient blur (glass effect) */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${cat.gradient} opacity-50 blur-xl group-hover:opacity-70 transition-all duration-500`}
        ></div>

        {/* Card content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <img
            src={cat.icon}
            alt={cat.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-white transition-colors">
            {cat.name}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</section>


);
};

export default Category;
