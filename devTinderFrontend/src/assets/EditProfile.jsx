import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const EditProfile = () => {
    const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [skills, setSkills] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setGender(user.gender || "");
            setAge(user.age || "");
            setSkills(user.skills || "");
            setPhotoURL(user.photoURL || "");
        }
    }, []);

    // ❗ payload SAME AS YOURS
    const payload = {
        age: age ? Number(age) : undefined,
        firstName,
        lastName,
        skills,
        photoURL,
        gender,
    };

    const handleEditProfile = async () => {
        setError("");

        try {
            const res = await axios.patch(BASE_URL+
                "/profile/edit",
                payload,
                { withCredentials: true }
            );
			setError(res?.data?.message);
			dispatch(addUser(res?.data?.data));
			setTimeout(() => {navigate("/"); }, 1500);
			
        } catch (err) {
            setError(err?.response?.data || "some fields are not mutable");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700 shadow-2xl p-6">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">
                    Edit Profile
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="photoURL"
                            className="text-gray-300 text-sm"
                        >
                            Photo URL
                        </label>
                        <input
                            id="photoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="text-gray-300 text-sm"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="text-gray-300 text-sm"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="gender"
                                className="text-gray-300 text-sm"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="age"
                                className="text-gray-300 text-sm"
                            >
                                Age
                            </label>
                            <input
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="skills"
                            className="text-gray-300 text-sm"
                        >
                            Skills
                        </label>
                        <input
                            id="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 bg-red-900/30 p-2 rounded-lg text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleEditProfile}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-2 rounded-xl text-white font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

        </div>
    );
};

export default EditProfile;
