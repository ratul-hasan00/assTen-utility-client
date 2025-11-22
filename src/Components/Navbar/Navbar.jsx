import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from '../../assets/logo (2).png';
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Bills", path: "/bills" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
    ];

    return (
        <nav className="w-full sticky top-0 z-50 shadow-sm bg-base-100 dark:bg-base-200 border-b border-base-200">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="BillHub Logo"
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
                        BillHub
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 items-center text-lg">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) =>
                                    `font-medium transition ${isActive
                                        ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text"
                                        : "text-base-content hover:text-pink-500"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}

                    {/* Theme toggle */}
                    <li><ThemeToggle></ThemeToggle></li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden gap-2">
                    {/* Theme toggle */}
                    <ThemeToggle />

                    {/* Hamburger */}
                    <button
                        className="text-base-content"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden fixed top-16 right-4 w-52 rounded-l-xl shadow-lg z-50 ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="bg-gradient-to-b from-pink-500 via-red-400 to-orange-400 py-3 px-4 space-y-3 text-white rounded-l-xl">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                end={link.path === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block text-lg font-medium transition ${isActive
                                        ? "underline underline-offset-4"
                                        : "hover:underline hover:underline-offset-4"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
