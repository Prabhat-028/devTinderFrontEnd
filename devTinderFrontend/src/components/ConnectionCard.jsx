import React from "react";

const ConnectionCard = ({ user }) => {
    return (
        <div className="w-full bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4">
            <div className="flex items-center gap-4">
                {/* Profile Image */}
                <img
                    src={
                        user?.photoUrl ||
                        "https://tse1.mm.bing.net/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa"
                    }
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                />

                {/* User Info */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold capitalize">
                        {user?.firstName} {user?.lastName}
                    </h2>

                    {/* Gender */}
                    {user?.gender && (
                        <p className=" badge badge-outline badge-secondary text-sm text-gray-500 capitalize mt-1">
                            Gender: {user.gender}
                        </p>
                    )}

                    {user?.age && (
                        <p className=" badge badge-outline badge-secondary text-sm text-gray-500 capitalize mt-1 mx-3">
                            Age: {user.age}
                        </p>
                    )}

                    {/* Skills */}
                    {user?.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="badge badge-outline badge-secondary"
                                >
                                    Skill: {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action */}
                <div>
                    <button className="btn btn-sm btn-primary btn-outline">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectionCard;
