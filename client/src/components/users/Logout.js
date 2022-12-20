import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("Trying to log you out...");

    useEffect(() => { getStatus() })

    async function getStatus() {
        try {
            const { data } = await axios.get(`http://localhost:4000/users/status`);
            if (!data.data.isUserLoggedIn) { setMsg("Hey you're not even logged in. NOT COOL !!!") }
            else { logOut() }
        } catch (error) {
            console.error(error.message || error);
        }
    }

    async function logOut() {
        try {
            const { data } = await axios.get('http://localhost:4000/logout');
            if (data) { setMsg("Logged out successfully. See you again!") }
        } catch (error) {
            console.log(error.message || error)
            setMsg("Something went wrong! Log out failed or already logged out!")
            alert(error.response.data.data);
        }
    }

    return (
        <div className="container position-absolute top-50 start-50 translate-middle m-5 p-5 bg-body rounded col-md-5 col-lg-5">
            <h1 className="mb-3">Log out</h1>
            <p>
                {msg}
            </p>
            <button className="btn btn-primary col-3" onClick={() => { navigate('/') }}>Home</button>
        </div>
    )
}

export default Logout