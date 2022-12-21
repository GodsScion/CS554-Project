import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions';

import { BE_URL } from '../../enums';
import { toast } from 'react-toastify';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { logOut() }, []);

    async function logOut() {
        try {
            await axios.post(`${BE_URL}/users/logout`);
            dispatch(logout());
            navigate('/');
            toast.success("Logged out", { autoClose: 4000 });
        } catch (error) {
            console.log(error.message || error)
            toast.error("Something went wrong! Log out failed, Please try again!", { autoClose: 4000 })
            toast.error(error.response.data.data, { autoClose: 4000 });
        }
    }

    return (
        <div className="container position-absolute top-50 start-50 translate-middle m-5 p-5 bg-body rounded col-md-5 col-lg-5">
            <h1 className="mb-3">Log out</h1>
            <button className="btn btn-primary col-3" onClick={() => { navigate('/') }}>Home</button>
        </div>
    )
}

export default Logout