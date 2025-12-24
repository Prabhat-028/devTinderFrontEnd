import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";


const UpdatePassword = () => {
	const user = useSelector((store) => store.user);
    const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [emailId, setEmailId] = useState("");
	const [error, setError] = useState("");
	

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.patch(
                BASE_URL + "/profile/editPassword",
                {
                    emailId,
					currentPassword,
					newPassword
                },
                { withCredentials: true }
			); console.log("response:", res.data);
			setError(res.data);
			setTimeout(() => {
				setError("");
			},3000)
        
            console.log(currentPassword, newPassword);
		} catch (error) {
			setError("Error:" + error.response?.data);
			setTimeout(() => {
                setError("");
            }, 3000);
			console.log("Error:", error.response?.data);
		}
		
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
                    Update Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                           EmailId
                        </label>
                        <input
                            type="text"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder={user.emailId}
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    {/* Old Password */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Old Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter old password"
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
					</div>
					{error && <p className="bg-red-500">{error}</p>}

                    {/* Button */}
					<button
						
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-lg hover:opacity-90 transition duration-300 shadow-lg"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
