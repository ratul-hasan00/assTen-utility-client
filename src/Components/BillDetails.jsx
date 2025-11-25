import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast"; // <--- import React Hot Toast

const BillDetails = () => {
    const bill = useLoaderData();  // GET DATA FROM ROUTER LOADER
    const { user } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);

    const billMonth = new Date(bill.date).getMonth();
    const currentMonth = new Date().getMonth();
    const isPayable = billMonth === currentMonth;

    // Handle payment submission
    const handlePayBill = async (e) => {
        e.preventDefault();
        const form = e.target;

        const payInfo = {
            email: user?.email,
            billId: bill._id,
            amount: bill.amount,
            username: form.username.value,
            address: form.address.value,
            phone: form.phone.value,
            date: new Date().toISOString(),
            additional: form.additional.value,
        };

        try {
            const res = await fetch("http://localhost:3000/payment-bills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payInfo),
            });
            const data = await res.json();

            if (data.insertedId) {
                toast.success("Bill Paid Successfully!");
                setOpenModal(false);
                form.reset(); // Clear form after success
            } else {
                toast.error("Payment failed! Try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <title>Bill Details</title>
            {/* Card */}
            <div className="flex flex-col md:flex-row bg-gradient-to-tr from-pink-500 via-red-400 to-orange-400 p-6 rounded-xl shadow-lg items-center md:items-start text-center md:text-left">

                {/* Left: Image */}
                <div className="md:w-1/2 flex items-center justify-center p-6 relative">
                    <div className="w-80 h-80 rounded-xl bg-gradient-to-tr from-blue-500 via-cyan-400 to-green-400 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
                        <img
                            src={bill.image}
                            alt={bill.title}
                            className="w-80 h-80 object-cover rounded-xl transform transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                </div>

                {/* Right: Bill Details */}
                <div className="md:w-1/2 flex flex-col justify-between p-6 text-white mt-6 md:mt-0">
                    <h2 className="text-3xl font-bold mb-3 text-white">{bill.title}</h2>

                    <p className="mb-1 text-white hover:translate-x-1 transition-transform duration-300">
                        <strong>Category:</strong> {bill.category}
                    </p>
                    <p className="mb-1 text-white hover:translate-x-1 transition-transform duration-300">
                        <strong>Location:</strong> {bill.location}
                    </p>
                    <p className="mb-1 text-white hover:translate-x-1 transition-transform duration-300">
                        <strong>Description:</strong> {bill.description}
                    </p>
                    <p className="mb-1 text-white hover:translate-x-1 transition-transform duration-300">
                        <strong>Amount:</strong> ${bill.amount}
                    </p>
                    <p className="mb-1 text-white hover:translate-x-1 transition-transform duration-300">
                        <strong>Date:</strong> {bill.date}
                    </p>

                    <div className="mt-6">
                        {isPayable ? (
                            <button
                                onClick={() => setOpenModal(true)}
                                className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 hover:scale-105 text-white px-6 py-3 rounded-lg transition-transform duration-300"
                            >
                                Pay Bill
                            </button>
                        ) : (
                            <button
                                disabled
                                className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
                            >
                                Only Current Month Bills Can Be Paid
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-gradient-to-tr from-pink-500 via-red-400 to-orange-400 p-6 rounded-xl w-[90%] max-w-md shadow-lg text-white">
                        <h2 className="text-2xl font-bold mb-4 text-center">Pay Bill</h2>

                        <form onSubmit={handlePayBill} className="space-y-3">
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />
                            <input
                                type="text"
                                value={bill._id}
                                readOnly
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />
                            <input
                                type="text"
                                value={bill.amount}
                                readOnly
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />

                            <input
                                name="username"
                                required
                                placeholder="Your Name"
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />
                            <input
                                name="address"
                                required
                                placeholder="Your Address"
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />
                            <input
                                name="phone"
                                required
                                placeholder="Phone"
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />

                            <input
                                type="text"
                                readOnly
                                value={new Date().toLocaleDateString()}
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />

                            <textarea
                                name="additional"
                                placeholder="Additional Info"
                                className="w-full border border-white/50 p-2 rounded bg-white/10 text-white"
                            />

                            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="px-5 py-2 bg-gray-300 text-black rounded-lg w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-full sm:w-auto"
                                >
                                    Confirm Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillDetails;
