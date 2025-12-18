
import Feed from "./assets/Feed";
import { Routes, Route } from "react-router-dom";
import Body from "./assets/Body";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import appstore from "./utils/appStore";


const AppLayout = () => {
    return (
        <>
            <Provider store={appstore}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route path="/" element={<Feed />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signUp" element={<SignUp />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default AppLayout;
