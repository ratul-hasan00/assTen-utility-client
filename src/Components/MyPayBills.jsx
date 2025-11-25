import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const MyPayBills = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editPayment, setEditPayment] = useState(null);

    // Fetch user's payment bills
    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/payment-bills?email=${user?.email}`);
            const data = await res.json();
            setPayments(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch payments!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchPayments();
    }, [user?.email]);

    // Delete payment
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this payment?")) return;
        try {
            const res = await fetch(`http://localhost:3000/payment-bills/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.deletedCount) {
                toast.success("Payment deleted successfully!");
                fetchPayments();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete payment!");
        }
    };

    // Update payment
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updated = {
            username: form.username.value,
            address: form.address.value,
            phone: form.phone.value,
            additional: form.additional.value,
        };
        try {
            const res = await fetch(`http://localhost:3000/payment-bills/${editPayment._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            const data = await res.json();
            if (data.modifiedCount) {
                toast.success("Payment updated!");
                setEditPayment(null);
                fetchPayments();
            } else {
                toast.error("No changes made!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Update failed!");
        }
    };

    // Download CSV
    const downloadCSV = () => {
        if (!payments.length) return;
        const headers = Object.keys(payments[0]).join(",");
        const rows = payments.map((p) => Object.values(p).join(","));
        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-payments.csv";
        link.click();
    };

    if (loading) return <p className="text-center py-10">Loading payments...</p>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Payment History</h2>
                <button
                    onClick={downloadCSV}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download CSV
                </button>
            </div>

            {payments.length === 0 ? (
                <p>No payments found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col justify-between"
                        >
                            <div className="space-y-1">
                                <p>
                                    <strong>Name:</strong> {p.username}
                                </p>
                                <p>
                                    <strong>Address:</strong> {p.address}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {p.phone}
                                </p>
                                <p>
                                    <strong>Amount:</strong> ${p.amount}
                                </p>
                                <p>
                                    <strong>Date:</strong> {new Date(p.date).toLocaleString()}
                                </p>
                                {p.additional && (
                                    <p>
                                        <strong>Additional:</strong> {p.additional}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setEditPayment(p)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editPayment && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Payment</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                name="username"
                                defaultValue={editPayment.username}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="address"
                                defaultValue={editPayment.address}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="phone"
                                defaultValue={editPayment.phone}
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                name="additional"
                                defaultValue={editPayment.additional}
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditPayment(null)}
                                    className="px-4 py-2 bg-gray-400 rounded text-white"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPayBills;
