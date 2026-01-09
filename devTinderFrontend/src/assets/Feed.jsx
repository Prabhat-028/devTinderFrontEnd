import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const LIMIT = 10;

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed || []);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchFeed = async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}/feed?page=${page}&limit=${LIMIT}`,
                { withCredentials: true }
            );

            const newUsers = res?.data?.data ?? [];

            if (newUsers.length === 0) {
                setHasMore(false); // no more users
                return;
            }

            dispatch(addFeed([...feed, ...newUsers]));
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("ERROR:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // initial load
    useEffect(() => {
        if (feed.length === 0) fetchFeed();
    }, []);

    // empty state
    if (!loading && feed.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-white text-lg">
                    No user available at the moment
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            {/* Card Stack */}
            <div className="relative w-full flex justify-center items-center flex-1">
                {feed.map((item, index) => (
                    <div
                        key={item._id}
                        className="absolute transition-all duration-300"
                        style={{
                            zIndex: feed.length - index,
                            transform: `translateY(${index * 12}px) scale(${
                                1 - index * 0.03
                            })`,
                            opacity: index > 3 ? 0 : 1,
                        }}
                    >
                        <UserCard user={item} />
                    </div>
                ))}
            </div>

            {/* Load More */}
            {hasMore && (
                <button
                    onClick={fetchFeed}
                    disabled={loading}
                    className="btn btn-primary mb-6"
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            )}
        </div>
    );
};

export default Feed;
