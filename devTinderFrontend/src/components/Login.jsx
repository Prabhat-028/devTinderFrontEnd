import React, { useState } from "react";
import axios from "axios";

const Login = () => {
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const handleClick = async () => {
		try {
			const res = await axios.post("http://localhost:1998/login", {
                emailId,
                password,
            });
            console.log(res);
		}
		catch (err) {
			console.log(err);
		}
		
		
	}
	
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

                    <div className="form-control mt-6">
                        <button onClick={handleClick} className="btn btn-primary w-full">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
