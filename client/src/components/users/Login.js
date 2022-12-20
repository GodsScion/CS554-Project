import React from 'react'
import { useNavigate } from 'react-router-dom'
const xss = require('xss');

const Login = () => {
    const navigate = useNavigate()

    async function hangleLogin(e){
        e.preventDefault();

console.log(e)
    }

    return(
            <div className="card position-absolute top-50 start-50 translate-middle p-3">
            <div className="card-body" >
                <h2 className="card-title">Please enter your details</h2>
                <form>
                    <label htmlFor='email'>Email: </label>
                    <input id="email" name="email" type="email" className='form-control mb-3' placeholder='email' required></input>
                    <label htmlFor='password'>Email: </label>
                    <input id="password" name="password" type="password" className='form-control mb-3' placeholder='password' required></input>
                    <div className='form-text'>email and password are required</div>
                    <br/>
                    <button className='btn btn-primary' onClick={hangleLogin}>Login</button>
                </form>
            </div>
            <button className='btn btn-primary' onClick={()=>{navigate('/register')}}>Sign Up</button>
            </div>
            
    )
}

export default Login