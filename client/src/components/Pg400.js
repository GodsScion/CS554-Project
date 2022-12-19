import React from "react";
import '../App.css';
import { useNavigate, useParams } from "react-router-dom";

const Page400 = () => {
    const navigate = useNavigate();
    let msg = useParams().msg || "Please don't do anything funny!";
    return (
        <div className="container m-5 p-2 bg-body rounded">
            <br />
            <h1>400: Bad Request!</h1>
            <br />
            <p>
                {msg}
            </p>
            <br />
            <button className="btn btn-primary" onClick={navigate('/')}>Home</button>
        </div>
    )
}

export default Page400