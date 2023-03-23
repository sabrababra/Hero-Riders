import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpWithLearner from './SignUpWithLearner';
import SignupWithRider from './SignupWithRider';
import bikeImg from '../../assets/img/bike.jpg'
import carImg from '../../assets/img/car.jpg'

const SignUp = () => {
    const [tab, setTab] = useState(1);
    
    return (
        <div
            className=' relative '
        >

            <div style={{zIndex:-1}} className='absolute top-0 right-0'>
                <img className='w-11/12 mx-auto h-[700px] opacity-[0.1]' src={tab === 1 ? carImg : bikeImg} alt="" />
            </div>

            <div style={{zIndex:1}} className='w-11/12 lg:w-8/12 mx-auto'>
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-center my-5 ">Signup Now!</h1>
                </div>
                <div className="tabs flex justify-center ">
                    <a
                        className={`tab tab-bordered w-1/2 lg:w-96 ${tab === 1 && 'tab-active'}`}
                        onClick={() => setTab(1)}
                    >As a Rider</a>
                    <a
                        className={`tab tab-bordered w-1/2 whitespace-nowrap lg:w-96 ${tab === 2 && 'tab-active'}`}
                        onClick={() => setTab(2)}
                    >As a Driving Lesson Learner</a>
                </div>

                <div  >
                    {
                        tab === 1 ?
                            <SignupWithRider />
                            :
                            <SignUpWithLearner />
                    }
                </div>

                <p className='text-center my-5' >Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>

            </div>
        </div>
    );
};

export default SignUp;