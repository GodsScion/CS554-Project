import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="container position-absolute top-50 start-50 translate-middle m-5 p-5 bg-body rounded col-md-5 col-lg-5">
            <h1 className="mb-3">404</h1>
            <p>
                Resource not found!
            </p>
            <button className="btn btn-primary col-3" onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Page404