import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginImg from '../assets/img/login.png';
import InputField from '../Components/InputField';
import useUser from '../hook/useUser';



const Login = () => {
    const { user, setUserData } = useUser();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        fetch(`http://localhost:5000/api/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    toast.success(data.message);
                    localStorage.setItem('user', JSON.stringify(data));
                    setUserData(data.user);
                    navigate(from, { replace: true });
                } else {
                    toast.error(data.message);

                }
            })


    }

    return (
        <div
            className='flex justify-center items-center min-h-screen'
        >
            <div className='grid grid-cols-1 lg:grid-cols-6 w-11/12 mx-auto'>

                <div className='w-11/12 lg:w-8/12 mx-auto col-span-4'>
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center my-5 ">Login Now!</h1>

                        <form onSubmit={onSubmit}>
                            <InputField
                                type='email'
                                label='Email'
                                name='email'
                                placeholder='Enter your email'
                                onChange={handleChange}
                            />
                            <InputField
                                type='password'
                                label='Password'
                                name='password'
                                placeholder='Enter your password'
                                onChange={handleChange}
                            />
                            <button className='btn btn-primary block mx-auto my-5 px-10' type="submit">login</button>
                        </form>
                    </div>


                    <p className='text-center my-5' >Create an account <Link className='text-secondary' to="/signup">Sign up</Link></p>

                </div>

                <div className='col-span-2 mx-auto'>
                    <img className='' src={loginImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;