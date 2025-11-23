import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo (2).png";
import ThemeToggle from "../ThemeToggle";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);

    // Logout Handler
    const handleLogout = async () => {
        try {
            await signOutUser();
            toast.success("Logged out!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Links when logged out
    const publicLinks = [
        { name: "Home", path: "/" },
        { name: "Bills", path: "/bills" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
    ];

    // Links when logged in
    const privateLinks = [
        { name: "Home", path: "/" },
        { name: "Bills", path: "/bills" },
        { name: "My Pay Bills", path: "/mypaybills" },
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
                    {(user ? privateLinks : publicLinks).map((link) => (
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

                    {/* When logged in show Profile Avatar + Logout */}
                    {user && (
                        <>
                            {/* Profile Avatar */}
                            <li>
                                <Link to="/profile">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/FJqVbRv/user.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border border-base-300 object-cover cursor-pointer hover:scale-105 transition"
                                    />
                                </Link>
                            </li>

                            {/* Logout Button */}
                            <li>
                                <button
                                    className="px-4 py-1 rounded-lg font-semibold 
                  bg-gradient-to-r from-pink-500 via-red-400 to-orange-400
                  text-white hover:opacity-90 transition"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                    {/* Theme toggle */}
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>

                {/* Mobile Controls */}
                <div className="flex items-center md:hidden gap-2">
                    <ThemeToggle />

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
                className={`md:hidden transition-all duration-300 overflow-hidden fixed top-16 right-4 w-56 rounded-l-xl shadow-lg z-50 ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="bg-gradient-to-b from-pink-500 via-red-400 to-orange-400 py-3 px-4 space-y-3 text-white rounded-l-xl">

                    {(user ? privateLinks : publicLinks).map((link) => (
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

                    {user && (
                        <>
                            {/* Mobile Profile */}
                            <li>
                                <Link
                                    to="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/FJqVbRv/user.png"}
                                        className="w-10 h-10 rounded-full border border-white"
                                    />
                                    <span className="font-semibold">{user?.displayName || "User"}</span>
                                </Link>
                            </li>

                            {/* Mobile logout */}
                            <li>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setOpen(false);
                                    }}
                                    className="w-full text-left text-lg font-semibold hover:underline underline-offset-4"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
