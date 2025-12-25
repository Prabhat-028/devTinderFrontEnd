import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, _id } = user;

    const dispatch = useDispatch();
    const [toast, setToast] = useState(null);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );

            // ✅ SHOW TOAST FIRST
            showToast("success", `You marked ${firstName} as ${status}`);

            // ✅ REMOVE CARD AFTER TOAST IS VISIBLE
            setTimeout(() => {
                dispatch(removeUserFromFeed(userId));
            }, 1500);
        } catch (error) {
            showToast(
                "error",
                error?.response?.data?.message || "Action failed"
            );
            console.error(error);
        }
    };

    return (
        <div className=" px-4">
            {toast && (
                <div className="toast toast-top toast-end z-50">
                    <div
                        className={`alert ${
                            toast.type === "success"
                                ? "alert-success"
                                : "alert-error"
                        }`}
                    >
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="card w-96 min-h-[520px] bg-neutral-900 text-white rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30">
                <figure className="h-72">
                    <img
                        src="https://tse1.mm.bing.net/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-t-3xl"
                    />
                </figure>

                <div className="card-body text-center px-6 py-6 space-y-3">
                    <h2 className="text-2xl font-bold tracking-wide">
                        {firstName} {lastName}
                    </h2>

                    <div className="text-sm text-gray-400">
                        {age && <span>Age: {age}</span>}
                        {age && gender && <span className="mx-2">•</span>}
                        {gender && <span>{gender}</span>}
                    </div>

                    {about && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                            {about}
                        </p>
                    )}

                    <div className="card-actions justify-center mt-auto gap-4 pt-4">
                        <button
                            className="btn btn-outline btn-error w-28"
                            onClick={() => handleSendRequest("ignore", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-primary w-28"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
