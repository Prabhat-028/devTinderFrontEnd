import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [emailId, setEmailId] = useState("gautam@gmail.com");
	const [password, setPassword] = useState("Gautam@123");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user,setUser] = useState("");
	const handleClick = async () => {
		try {
			const res = await axios.post("http://localhost:1998/login", {
                emailId,
                password,
            });
			// console.log(res);
			dispatch(addUser(res.data));
			//adding the user
			setUser(res.data);
			//after login the user is successfully transfered to the / page
			navigate("/");
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
                        <button
                            onClick={handleClick}
                            className="btn btn-primary w-full"
                        >
                            Login
                        </button>
                    </div>
					{/* {!user ? <p>Invalid Credentials</p> : <p>Login Succesfull..Welcome ,{user.firstName}</p>} */}
                </div>
            </div>
        </div>
    );
};

export default Login;
