import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const feedData = async () => {
        if (feed.length > 0) return;

        try {
            const res = await axios.get(`${BASE_URL}/feed`, {
                withCredentials: true,
            });

            dispatch(addFeed(res.data.data ?? res.data));
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    useEffect(() => {
        feedData();
    }, []);

    // ✅ AFTER hooks — conditional rendering
    if (!feed) return null;

    if (feed.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-white text-lg">
                    No user available at the moment
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            {feed.map((item, index) => (
                <div
                    key={item._id}
                    className="absolute transition-all duration-300"
                    style={{
                        zIndex: feed.length - index,
                        transform: `translateY(${index * 12}px) scale(${
                            1 - index * 0.03
                        })`,
                        opacity: index > 3 ? 0 : 1, // sirf top 4 cards
                    }}
                >
                    <UserCard user={item} />
                </div>
            ))}
        </div>
    );
};

export default Feed;
