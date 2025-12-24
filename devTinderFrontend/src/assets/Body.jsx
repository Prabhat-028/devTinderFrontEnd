import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector(store => store.user);
	const fetchUser = async () => {
		if (userData) return;
		try {
			const res = await axios.get(
               "http://localhost:1998/profile/view",
                { withCredentials: true }
            );
			dispatch(addUser(res.data));
			if (res.status == 401) {
				navigate("/login");
			}
			
		} catch (error) {
			console.log("ERROR:",error)
		}
		
	}
	useEffect(() => {
        fetchUser();
    }, []);

  return (
      <>
		  <NavBar />
		  <Outlet />
		  <Footer/>
      </>
  );
}

export default Body