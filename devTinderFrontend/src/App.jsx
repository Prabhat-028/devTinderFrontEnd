import NavBar from "./assets/NavBar";
import Feed from "./assets/Feed";
import { Routes, Route } from "react-router-dom";
import Body from "./assets/Body";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";


const AppLayout = () => {
    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Body/>}>
                        <Route path="/feed" element={<Feed />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signUp" element={<SignUp/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppLayout;
