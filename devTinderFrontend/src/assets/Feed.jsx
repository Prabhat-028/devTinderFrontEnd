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

    return (
        <div className="ml-2 pt-2">
            {feed.length === 0 && (
                <p className="text-white text-center">Loading feed...</p>
            )}

            {feed.map((item) => (
                <UserCard key={item._id} user={item} />
            ))}
        </div>
    );
};

export default Feed;
