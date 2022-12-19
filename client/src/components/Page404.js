import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="container m-5 p-2 bg-body rounded">
            <br />
            <h1>404</h1>
            <br />
            <p>
                Resource not found!
            </p>
            <button className="btn btn-primary" onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Page404