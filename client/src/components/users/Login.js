import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function hangleLogin(e) {
        try {
            e.preventDefault();
            const sendData = {
                email: email,
                password: password
            }
            const { data } = await axios.post('http://localhost:4000/api/users/login', sendData);
            const userData = data.data;
            dispatch(login(userData.id, userData.name, userData.img));
            navigate('/');
            toast.success(`Welcome ${userData.name}`);
        } catch (error) {
            toast.error(error.response.data.data);
        }
    }


    return (
        <div className="card position-absolute top-50 start-50 translate-middle p-3">
            <div className="card-body" >
                <h1 className="card-title mb-3">Login</h1>
                <form onSubmit={hangleLogin}>
                    <label htmlFor='email'>Please enter the email you signed-up with: </label>
                    <input id="email" name="email" type="email" className='form-control mb-3' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} required></input>
                    <label htmlFor='password'>Please enter your password: </label>
                    <input id="password" name="password" type="password" className='form-control mb-3' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required></input>
                    <div className='form-text'>Email and password are required.</div>
                    <br />
                    <button className='btn btn-primary mb-3 col-sm-4' type='submit'>Login</button>
                </form>
                <br />
                <div>Don't have an account?</div>
                <div className='mb-2'>Click on Sign Up to create your account:</div>
                <button className='btn btn-primary mb-3 col-sm-4' onClick={() => { navigate('/register') }}>Sign Up</button>
            </div>
        </div>

    )
}

export default Login