import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
    const dispatch = useDispatch();
    const requestList = useSelector((store) => store.requests);

    const [error, setError] = useState("");
    const [loadingId, setLoadingId] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/request/received`, {
                withCredentials: true,
            });
            dispatch(addRequest(res?.data?.data || []));
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load requests");
        }
    };

    const reviewRequest = async (status, requestId, userName) => {
        try {
            setLoadingId(requestId);

            await axios.post(
                `${BASE_URL}/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );

            dispatch(
                addRequest(requestList.filter((req) => req._id !== requestId))
            );

            showToast("success", `You have ${status} ${userName}'s request`);
        } catch (err) {
            showToast("error", err?.response?.data?.message || "Action failed");
        } finally {
            setLoadingId(null);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            {/* DaisyUI Toast */}
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

            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Connection Requests</h2>
                <p className="text-gray-500 mt-1">
                    People who want to connect with you
                </p>
            </div>

            {/* Requests List */}
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {requestList.map((request) => {
                    const user = request.fromUserId;
                    const fullName = `${user?.firstName} ${user?.lastName}`;

                    return (
                        <div
                            key={request._id}
                            className="w-full bg-base-100 rounded-xl shadow-md p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        user?.photoUrl ||
                                        "https://tse1.mm.bing.net/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa"
                                    }
                                    className="w-20 h-20 rounded-full border-4 border-primary"
                                />

                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold">
                                        {fullName}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        className="btn btn-sm btn-success"
                                        disabled={loadingId === request._id}
                                        onClick={() =>
                                            reviewRequest(
                                                "accepted",
                                                request._id,
                                                fullName
                                            )
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-sm btn-outline btn-error"
                                        disabled={loadingId === request._id}
                                        onClick={() =>
                                            reviewRequest(
                                                "rejected",
                                                request._id,
                                                fullName
                                            )
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Request;
