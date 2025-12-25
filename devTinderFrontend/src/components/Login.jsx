import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { loginSuccess } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const handleSignUp = () => {
		navigate("/signup");
	}

    const handleClick = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                { emailId, password },
                { withCredentials: true }
            );

            const userData = res?.data?.data || res?.data;

            dispatch(loginSuccess(userData)); // ✅ auth
            dispatch(addUser(userData)); // ✅ user
            navigate("/");
        } catch (err) {
            const msg =
                err?.response?.data?.message || err?.message || "Login failed";
			setTimeout(() => {
				setError("");
			}, 1500)
			setError(msg);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>

                    <input
                        type="email"
                        value={emailId}
                        placeholder="Email"
                        className="input input-bordered"
                        onChange={(e) => setEmailId(e.target.value)}
                    />

                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        className="input input-bordered mt-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="mt-3 rounded bg-red-600 p-2 text-center text-white">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="btn btn-primary w-full mt-6"
                    >
                        {loading ? "Logging in..." : "Login"}
					</button>
					<p className="underline bg-red-500 cursor-pointer" onClick={()=>{handleSignUp()}}>Not an User?SignUp First</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
