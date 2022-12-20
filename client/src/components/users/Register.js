import React from 'react'
import { useNavigate } from 'react-router-dom'
const xss = require('xss');

const Register = () => {
    const navigate = useNavigate();

    return(
        <div className="container position-absolute top-50 start-50 translate-middle m-5 p-2 bg-body rounded">
            <div className="card">
            <div className="card-body" >
                <h2 className="card-title">Please enter your details</h2>
                <form>
                    <input id="name" name="name" className='form-control' placeholder='How would you like to be called?'>xss()</input>

                </form>
            </div>
            </div>
            <hr/>
            <p>Already have an account? Click Login to login</p>
            <button className='btn btn-primary' onClick={()=>{navigate('/login')}}>Login</button>
        </div>
    )
}

export default Register