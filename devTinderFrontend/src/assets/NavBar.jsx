import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, DEFAULT_PROFILE_IMAGE } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
	const user = useSelector(store => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogOut = async () => {
		await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
		dispatch(removeUser());
		return navigate("/login");
	}
	console.log(user);
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        DEVTINDER
                    </Link>
                </div>
                {user && (
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end flex">
                            <p>Welcome,{user.firstName}</p>
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full ">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={
                                            user.photoURL ||
                                            DEFAULT_PROFILE_IMAGE
                                        }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link
                                        to="/profile"
                                        className="justify-between"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile/editPassword">
                                        UpdatePassword
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/connection">connections</Link>
                                </li>
                                <li>
                                    <Link to="/request">request</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogOut}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
