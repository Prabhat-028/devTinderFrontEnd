import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";
import { useNavigate } from "react-router-dom";

const Connections = () => {
    const dispatch = useDispatch();
	const connectionList = useSelector((store) => store.connections);
	const navigate = useNavigate();

	const handleConnection = () => {
		navigate("/");
	}
    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true,
            });
            dispatch(addConnections(res?.data?.data || []));
        } catch (error) {
            console.log("ERROR:", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Connections</h2>
                <p className="text-gray-500 mt-1">
                    People you are connected with
                </p>
            </div>

            {/* Empty State */}
            {connectionList.length === 0 && (
                <div className="flex justify-center">
                    <div className="alert alert-info max-w-md text-center shadow-md">
                        <span>
                            <button onClick={()=>handleConnection()}>
                                🤝 No connections yet. Start connecting!
                            </button>
                        </span>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {connectionList.map((connection) => (
                    <ConnectionCard key={connection._id} user={connection} />
                ))}
            </div>
        </div>
    );
};

export default Connections;
