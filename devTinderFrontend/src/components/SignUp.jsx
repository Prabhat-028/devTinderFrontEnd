import React from 'react'

const SignUp = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>

                    <form  className="space-y-3">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            name="lastName"
                            placeholder="Last Name"
                            className="input input-bordered w-full"
                          
                        />

                        <input
                            type="email"
                            name="emailId"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            required
                          
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                     
                        />

                        <input
                            name="photoURL"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                           
                        />

                        <input
                            name="mobileNo"
                            placeholder="Mobile Number"
                            className="input input-bordered w-full"
                           
                        />

                        <input
                            name="age"
                            placeholder="Age"
                            className="input input-bordered w-full"
                           
                        />

                        <input
                            name="skills"
                            placeholder="Skills (comma separated)"
                            className="input input-bordered w-full"
                            
                        />

                        <select
                            name="gender"
                            className="select select-bordered w-full"
                            required
                            
                        >
                            <option value="" disabled selected>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;