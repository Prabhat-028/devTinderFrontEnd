import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appstore from "./utils/appStore";

import Body from "./assets/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./assets/Feed";
import Profile from "./assets/Profile";
import Connections from "./components/Connections";
import Request from "./components/Request";
import EditProfile from "./assets/EditProfile";
import Chat from "./components/Chat";

const AppLayout = () => {
    return (
        <Provider store={appstore}>
            <BrowserRouter>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    {/* APP (PRIVATE VIA BODY) */}
                    <Route path="/" element={<Body />}>
                        <Route index element={<Feed />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="connection" element={<Connections />} />
						<Route path="request" element={<Request />} />
						<Route path="profile/editProfile" element={<EditProfile />} />
						<Route path="/chat/:targetUserId" element={<Chat/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default AppLayout;
