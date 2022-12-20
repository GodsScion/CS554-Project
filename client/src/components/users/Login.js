import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const xss = require('xss');

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=>{getStatus()},[])

    async function getStatus(){
        try {
            const { data } = await axios.get(`http://localhost:4000/users/status`);
            if(data.data.isUserLoggedIn) { navigate('/') }
        } catch (error) {
            console.error(error.message || error);
        }
      }

    async function hangleLogin(e){
        try {
            e.preventDefault();
            const sendData = {
                email: email,
                password: password
            }
            const res = await axios.post('http://localhost:4000/login',sendData);
            if(res){navigate('/')}
        } catch (error) {
            console.log(error)
            alert(error.message || error)    
        }
    }


    return(
            <div className="card position-absolute top-50 start-50 translate-middle p-3">
            <div className="card-body" >
                <h1 className="card-title mb-3">Login</h1>
                <form onSubmit={hangleLogin}>
                    <label htmlFor='email'>Please enter the email you signed-up with: </label>
                    <input id="email" name="email" type="email" className='form-control mb-3' placeholder='Email' onChange={(e)=>{setEmail(xss(e.target.value))}} required></input>
                    <label htmlFor='password'>Please enter your password: </label>
                    <input id="password" name="password" type="password" className='form-control mb-3' placeholder='Password' onChange={(e)=>{setPassword(xss(e.target.value))}} required></input>
                    <div className='form-text'>Email and password are required.</div>
                    <br/>
                    <button className='btn btn-primary mb-3 col-sm-4' type='submit'>Login</button>
                </form>
                <br/>
                <div>Don't have an account?</div>
                <div className='mb-2'>Click on Sign Up to create your account:</div>
                <button className='btn btn-primary mb-3 col-sm-4' onClick={()=>{navigate('/register')}}>Sign Up</button>
            </div>
            </div>
            
    )
}

export default Login