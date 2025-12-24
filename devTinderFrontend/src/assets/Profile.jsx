import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const Profile = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const connections = useSelector((store) => store.connections);
	
	const handleEditProfile = () => {
		navigate("/profile/editProfile");
	}

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-lg">
                Please login to view your profile
            </div>
        );
    }

    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full">
							<img
								src={user.photoURL|| DEFAULT_PROFILE_IMAGE}
                                alt="Profile"
                            />
                        </div>
                    </div>

                    <h2 className="card-title text-xl">
                        {user.firstName} {user.lastName}
                    </h2>

                    <p className="text-sm opacity-70">{user.email}</p>

                    <div className="mt-4 w-full text-left space-y-2">
                        <p>
                            <strong>Gender:</strong>{" "}
                            {user.gender || "Not specified"}
                        </p>
                        <p>
                            <strong>Age:</strong> {user.age || "Not specified"}
						</p>
						{connections && <p>{connections.length +" "}connections</p>}
                    </div>

                    <div className="card-actions mt-6">
                        <button onClick={handleEditProfile} className="btn btn-primary btn-sm">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
