import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useState } from "react";

const Request = () => {
    const dispatch = useDispatch();
	const requestList = useSelector((store) => store.requests);
	const [error, setError] = useState("");

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/request/received`, {
                withCredentials: true,
            });
			dispatch(addRequest(res?.data?.data || []));
		} catch (error) {
			setError(error?.response?.data);
			console.log(error);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    return (
		<div className="min-h-screen bg-base-200 py-10 px-4">
			
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Connection Requests</h2>
                <p className="text-gray-500 mt-1">
                    People who want to connect with you
                </p>
            </div>

            {/* Empty State */}
            {requestList.length === 0 && (
                <div className="flex justify-center">
                    <div className="alert alert-info max-w-md shadow-md">
                        <span>📭 No requests received</span>
                    </div>
                </div>
            )}

            {/* Requests List */}
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {requestList.map((request) => (
                    <div
                        key={request._id}
                        className="w-full bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4"
                    >
                        <div className="flex items-center gap-4">
                            {/* Profile Image */}
                            <img
                                src={
                                    request?.fromUserId?.photoUrl ||
                                    "https://tse1.mm.bing.net/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa"
                                }
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold capitalize">
                                    {request.fromUserId?.firstName}{" "}
                                    {request.fromUserId?.lastName}
                                </h3>

                                {request?.fromUserId?.gender && (
                                    <p className="text-sm text-gray-500 capitalize mt-1">
                                        Gender: {request.fromUserId?.gender}
                                    </p>
                                )}
                                {request?.fromUserId?.age && (
                                    <p className="text-sm text-gray-500 capitalize mt-1">
                                        Age: {request.fromUserId?.age}
                                    </p>
                                )}

                                {request?.fromUserId?.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {request.fromUserId?.skills.map(
                                            (skill, index) => (
                                                <span
                                                    key={index}
                                                    className="badge badge-outline badge-secondary"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button className="btn btn-sm btn-success">
                                    Accept
                                </button>
                                <button className="btn btn-sm btn-outline btn-error">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Request;
