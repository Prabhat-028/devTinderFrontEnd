import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("gautam@gmail.com");
    const [password, setPassword] = useState("Gautam@123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                { emailId, password },
                { withCredentials: true }
            );

            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            const msg =
                err?.response?.data?.message || err?.message || "Sign up first";

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

                    <div className="form-control">
                        <input
                            type="email"
                            value={emailId}
                            placeholder="Email"
                            className="input input-bordered"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>

                    <div className="form-control mt-3">
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            className="input input-bordered"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="mt-3 rounded bg-red-600 p-2 text-center text-white">
                            {error}
                        </p>
                    )}

                    <div className="form-control mt-6">
                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
