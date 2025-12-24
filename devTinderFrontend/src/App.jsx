

import { Routes, Route } from "react-router-dom";
import Body from "./assets/Body";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import appstore from "./utils/appStore";
import Profile from "./assets/Profile";
import Feed from "./assets/Feed";
import EditProfile from "./assets/EditProfile";
import UpdatePassword from "./assets/UpdatePassword";
import Connections from "./components/Connections";
import Request from "./components/Request";

const AppLayout = () => {
    return (
        <>
            <Provider store={appstore}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Body />}>
                            {/* <Route path="/" element={<Feed />} /> */}
                            <Route index element={<Feed />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signUp" element={<SignUp />} />
                            <Route path="profile" element={<Profile />} />
                            
                            <Route
                                path="/profile/editProfile"
                                element={<EditProfile />}
                            />
                            <Route
                                path="/profile/editPassword"
                                element={<UpdatePassword />}
                            />
                            <Route
                                path="/connection"
                                element={<Connections />}
                            />
                            <Route path="/request" element={<Request />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default AppLayout;
