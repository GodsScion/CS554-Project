import React from "react";
import '../App.css';
import { useNavigate, useParams } from "react-router-dom";

const Page400 = () => {
    const navigate = useNavigate();
    let msg = useParams().msg || "Please don't do anything funny!";
    return (
        <div className="container position-absolute top-50 start-50 translate-middle m-5 p-5 bg-body rounded">
            <h1>400: Bad Request!</h1>
            <hr/>
            <p>
                {msg}
            </p>
            <button className="btn btn-primary" onClick={navigate('/')}>Home</button>
            <br/>
        </div>
    )
}

export default Page400