import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
	const [skills, setSkills] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const payload = {
        age: age ? Number(age) : undefined,
        firstName,
        lastName,
        skills,
        photoURL,
        gender,
    };


	const handleEditProfile = async () => {

		try {
			const user = await axios.patch(
                "http://localhost:1998/profile/edit",
               payload,
                { withCredentials: true }
            );
			console.log("Upadated user is :", user.data);
			dispatch(addUser(user.data));
		} catch (error) {
			console.log(error.response);
			setError(error.message);
		}
		
	}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700 shadow-2xl p-6">
                <h2 className="text-2xl font-semibold text-center text-white mb-6 tracking-wide">
                    Edit Profile
                </h2>

                <div className="space-y-4">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="PhotoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Gender + Age */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white 
                         border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option className="bg-gray-800" value="">
                                Gender
                            </option>
                            <option className="bg-gray-800" value="male">
                                Male
                            </option>
                            <option className="bg-gray-800" value="female">
                                Female
                            </option>
                            <option className="bg-gray-800" value="other">
                                Other
                            </option>
                        </select>

                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white 
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Skill */}
                    <input
                        type="text"
                        placeholder="Skill (e.g. React)"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white 
                       placeholder-gray-400 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />{error && <p className="bg-red-600">{error}</p>}

                    {/* Button */}
                    <button onClick={handleEditProfile}
                        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white py-2 rounded-xl font-medium tracking-wide
                       hover:from-blue-700 hover:to-indigo-700 
                       transition-all duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
