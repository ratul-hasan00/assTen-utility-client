import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";


const MyPayBills = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editPayment, setEditPayment] = useState(null);
    const [deletePayment, setDeletePayment] = useState(null);

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

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/payment-bills/${deletePayment._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.deletedCount) {
                toast.success("Payment deleted successfully!");
                setDeletePayment(null);
                fetchPayments();
            } else {
                toast.error("Failed to delete payment!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error deleting payment!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updated = {
            username: form.username.value,
            address: form.address.value,
            phone: form.phone.value,
            amount: parseFloat(form.amount.value),
            date: form.date.value,
            additional: form.additional.value,
        };
        try {
            setLoading(true);
            const res = await fetch(`https://utility-billhub-server.vercel.app/payment-bills/${editPayment._id}`, {
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
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!payments.length) return;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("My Payment History", 14, 20);
        let y = 30;

        payments.forEach((p, idx) => {
            doc.setFontSize(12);
            doc.text(
                `#${idx + 1} - Name: ${p.username}, Address: ${p.address}, Phone: ${p.phone}, Amount: $${p.amount}, Date: ${new Date(
                    p.date
                ).toLocaleString()}, Additional: ${p.additional || "-"}`,
                14,
                y
            );
            y += 10;

            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save("my-payments.pdf");
    };

    if (loading)
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="container mx-auto p-6">
            <title>My Pay Bills</title>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text" data-aos="zoom-in"
                    data-aos-duration="1000">My Payment History</h2>

                <button
                    onClick={downloadPDF}
                    className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 
                    hover:scale-105 transition-transform duration-300 
                    text-white px-5 py-2 rounded-lg shadow-lg"
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                >
                    Download PDF
                </button>
            </div>

            {payments.length === 0 ? (
                <p className="dark:text-gray-300">No payments found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="zoom-in"
                    data-aos-duration="1800">
                    {payments.map((p) => (
                        <div
                            key={p._id}
                            className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 
                            p-5 rounded-2xl shadow-lg 
                            text-white dark:text-white 
                            transition-all duration-300 transform 
                            hover:scale-[1.03] hover:shadow-2xl 
                            flex flex-col justify-between h-full"
                        >
                            <div className="space-y-1">
                                <p><strong>Name:</strong> {p.username}</p>
                                <p><strong>Address:</strong> {p.address}</p>
                                <p><strong>Phone:</strong> {p.phone}</p>
                                <p><strong>Amount:</strong> ${p.amount}</p>
                                <p><strong>Date:</strong> {new Date(p.date).toLocaleString()}</p>
                                {p.additional && <p><strong>Additional:</strong> {p.additional}</p>}
                            </div>

                            <div className="flex justify-between mt-6 pt-4">
                                <button
                                    onClick={() => setEditPayment(p)}
                                    className="px-4 py-1 rounded text-white shadow-md
                                    bg-gradient-to-r from-blue-500 to-blue-600
                                    hover:from-blue-600 hover:to-blue-700
                                    transition-transform duration-300 hover:scale-105"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setDeletePayment(p)}
                                    className="px-4 py-1 rounded text-white shadow-md
                                    bg-gradient-to-r from-red-500 to-red-600
                                    hover:from-red-600 hover:to-red-700
                                    transition-transform duration-300 hover:scale-105"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editPayment && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="p-6 rounded-lg w-[90%] max-w-md shadow-lg bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Payment</h2>

                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input name="username" defaultValue={editPayment.username} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />
                            <input name="address" defaultValue={editPayment.address} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />
                            <input name="phone" defaultValue={editPayment.phone} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />
                            <input name="amount" type="number" defaultValue={editPayment.amount} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />
                            <input name="date" type="datetime-local" defaultValue={new Date(editPayment.date).toISOString().slice(0, 16)} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />
                            <textarea name="additional" defaultValue={editPayment.additional} className="w-full border p-2 rounded bg-white/20 text-white placeholder-white/70" />

                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setEditPayment(null)} className="px-4 py-2 rounded text-white shadow-md
                                    bg-gradient-to-r from-gray-400 to-gray-500
                                    hover:from-gray-500 hover:to-gray-600
                                    transition-transform duration-300 hover:scale-105">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded text-white shadow-md
                                    bg-gradient-to-r from-blue-500 to-blue-600
                                    hover:from-blue-600 hover:to-blue-700
                                    transition-transform duration-300 hover:scale-105">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deletePayment && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="p-6 rounded-lg w-[90%] max-w-md shadow-lg bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-white">
                        <h2 className="text-xl font-bold mb-4 text-center">Confirm Delete?</h2>
                        <p className="mb-4">
                            Are you sure you want to delete payment for <strong>{deletePayment.username}</strong>?
                        </p>

                        <div className="flex justify-between">
                            <button onClick={() => setDeletePayment(null)} className="px-4 py-2 rounded text-white shadow-md
                                bg-gradient-to-r from-gray-400 to-gray-500
                                hover:from-gray-500 hover:to-gray-600
                                transition-transform duration-300 hover:scale-105">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded text-white shadow-md
                                bg-gradient-to-r from-red-500 to-red-600
                                hover:from-red-600 hover:to-red-700
                                transition-transform duration-300 hover:scale-105">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPayBills;
