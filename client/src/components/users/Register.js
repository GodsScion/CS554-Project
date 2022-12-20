import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const defImg = require("../img/default.jpg")

const Register = () => {
    const navigate = useNavigate()
    const [img, setImg] = useState(undefined)
    const [preimg, setPreImg] = useState(defImg)
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function hangleSignUp(e) {
        try {
            e.preventDefault();
            const sendData = {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password,
                img: img, //Leave it undefined if not uploaded, I'll handle image not given, when requested give undefined or null when image is not there to react!
            }
            const res = await axios.post('http://localhost:4000/users/signup', sendData);
            if (res) { navigate('/') }
        } catch (error) {
            toast.error(error.response.data.data);
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setPreImg(URL.createObjectURL(file));
        const base64 = await convertToBase64(file);
        setImg(base64);
    };




    return (
        <div className="row container-fluid justify-content-center m-5 p-2">
            <div className="card col-md-5 col-lg-6 col-sm-10">
                <div className="card-body" >
                    <h1 className="card-title mb-4">Sign-Up</h1>
                    <form onSubmit={hangleSignUp}>

                        <div className="container mb-3">
                            <div className="picture-container">
                                <div className="picture">
                                    <img src={preimg} className="picture-src" alt='profile pic' />
                                    <input id="image" name="image" type="file" placeholder='Profile pic' accept="image/*" onChange={(e) => { handleImageUpload(e) }} ></input>
                                </div>
                                <label htmlFor='image'>Please upload your profile pic: </label>
                            </div>
                        </div>





                        <label htmlFor='firstname'>Please enter your First Name: *</label>
                        <input id="firstname" name="firstname" type="text" className='form-control mb-3' placeholder='First Name' onChange={(e) => { setFName(e.target.value) }} required></input>

                        <label htmlFor='lastname'>Please enter your Last Name: *</label>
                        <input id="lastname" name="lastname" type="text" className='form-control mb-3' placeholder='Last Name' onChange={(e) => { setLName(e.target.value) }} required></input>

                        <label htmlFor='email'>Please enter your email: *</label>
                        <input id="email" name="email" type="email" className='form-control' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} required></input>
                        <div className='form-text mb-3'>Don't worry, we won't share your email with anyone.</div>

                        <label htmlFor='password'>Please enter a password: *</label>
                        <input id="password" name="password" type="password" className='form-control mb-5' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required></input>

                        <p>Fields with * are required</p>
                        <button className='btn btn-primary mb-3 col-sm-4' type='submit'>Sign-Up</button>
                    </form>
                    <hr />
                    <p>Already have an account? Click Login to login</p>
                    <button className='btn btn-primary mb-3 col-sm-4' onClick={() => { navigate('/login') }}>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Register