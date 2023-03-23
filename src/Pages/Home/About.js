import React from 'react';
import img01 from '../../assets/img/login.png';

const About = () => {
    return (
        <div className='w-11/12 lg:w-9/12 mx-auto m-16'>
            <div className='flex flex-col lg:flex-row justify-center items-center'>
                <div className='lg:w-1/2'>
                    <img src={img01} alt="" />
                </div>
                <div className='lg:w-1/2 text-left px-10'>
                    <h1 className='text-3xl py-5'>Who We Are</h1>
                    <p className='my-5'>Being a responsible vehicle rider not only ensures your safety but also the safety of others on the road. Always wear appropriate safety gear such as a helmet, gloves, and reflective clothing to protect yourself from injuries in case of accidents.Finally, avoid riding under the influence of alcohol or drugs as impaired judgment can lead to dangerous accidents. By following these guidelines, you can enjoy a safe and pleasant riding experience.</p>
                    <p className='font-semibold mb-5'>We provide rider and driving lesson learner.</p>
                    <p className='mb-5'>Driving lessons for learners are essential to provide the necessary skills and knowledge to become a safe and responsible driver. To teach driving lessons effectively, instructors should first assess the learner's skill level and knowledge of traffic rules and regulations. including how to operate the vehicle's controls, changing gears, and navigating intersections. It's important to give learners plenty of practice time to build confidence and master each skill.</p>

                    <button className='btn btn-primary'>View More</button>
                </div>
            </div>
        </div>
    );
};

export default About;