import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, DEFAULT_PROFILE_IMAGE } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
        dispatch(removeUser());
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    MeetWith.dev
                </Link>
            </div>

            <div className="dropdown dropdown-end">
                <span className="mr-2">Welcome, {user.firstName}</span>
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <img
                        className="w-10 rounded-full"
                        src={user.photoURL || DEFAULT_PROFILE_IMAGE}
                        alt="profile"
                    />
                </div>

                <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link to="profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="connection">Connections</Link>
                    </li>
                    <li>
                        <Link to="request">Requests</Link>
                    </li>
                    <li>
                        <button onClick={handleLogOut}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
