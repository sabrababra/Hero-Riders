import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiCartwheel } from 'react-icons/gi';
import userImg from '../assets/img/banner.jpg';
import useUser from '../hook/useUser';

const Header = () => {
    const navigate = useNavigate()
    const { user, setUserData } = useUser();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [localStorage.getItem('user')])


    return (
        <div className="navbar bg-base-100 w-11/12 mx-auto py-5">
            <div className="flex-1">
                <Link to='/' className='flex gap-1 items-center '>
                    <GiCartwheel className='w-8 h-8 text-primary' />
                    <h1 className="normal-case text-xl text-primary font-bold">Hero Rider</h1>
                </Link>
            </div>
            <div className="flex-none">
                {
                    user?.email ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.profilePic?.base64 ? user?.profilePic?.base64 : userImg} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            {
                                user?.userRole==='admin' &&
                                <li>
                                <Link to='/dashboard' className="justify-between">
                                    Dashboard
                                </Link>
                            </li>}
                            {
                                user?.userRole==='learner' &&
                                <li>
                                <Link to='/package' className="justify-between">
                                    Buy package
                                </Link>
                            </li>}
                            <li><p
                                onClick={() => {
                                    localStorage.clear();
                                    setUserData(null);
                                    navigate('/login');
                                }}
                            >Logout</p></li>
                        </ul>
                    </div>
                        :
                        <div className="my-auto">
                            <Link to='/login' className="btn btn-outline btn-primary px-10">login</Link>
                            <Link to='/signup' className="btn btn-primary ml-4 px-10 text-white">Sign up</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Header;