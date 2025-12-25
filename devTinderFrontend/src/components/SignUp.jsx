import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../utils/authSlice";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        photoURL: "",
        mobileNo: "",
        age: "",
        skills: "",
        gender: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/signup`, formData, {
                withCredentials: true,
            });

            const userData = res?.data?.data || res?.data;

            dispatch(loginSuccess(userData));
            dispatch(addUser(userData));

            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                            name="firstName"
                            placeholder="First Name"
                            className="input input-bordered w-full"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <input
                            name="lastName"
                            placeholder="Last Name"
                            className="input input-bordered w-full"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="emailId"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            required
                            value={formData.emailId}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <input
                            name="photoURL"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            value={formData.photoURL}
                            onChange={handleChange}
                        />

                        <input
                            name="mobileNo"
                            placeholder="Mobile Number"
                            className="input input-bordered w-full"
                            value={formData.mobileNo}
                            onChange={handleChange}
                        />

                        <input
                            name="age"
                            placeholder="Age"
                            className="input input-bordered w-full"
                            value={formData.age}
                            onChange={handleChange}
                        />

                        <input
                            name="skills"
                            placeholder="Skills (comma separated)"
                            className="input input-bordered w-full"
                            value={formData.skills}
                            onChange={handleChange}
                        />

                        <select
                            name="gender"
                            className="select select-bordered w-full"
                            required
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
