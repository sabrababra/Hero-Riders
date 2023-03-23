import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImgInput from '../../Components/ImgInput';
import InputField from '../../Components/InputField';
import useUser from '../../hook/useUser';



const SignupWithRider = () => {
    const { user, setUserData } = useUser();
    const [formData, setFormData] = useState({});
    const [licencePic, setLicencePic] = useState(null);
    const [nidPic, setNidPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data={...formData,licencePic,nidPic,profilePic,userRole:'rider',block:false}
        console.log(data);
        if (data.password.length < 6) {
            toast.error('Password must have 6 letter');
        }
        else if (data.password === data.confirm) {

            fetch(`https://hero-riders-server.vercel.app/api/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        toast.success(data.message);
                        localStorage.setItem('user', JSON.stringify(data));
                        setUserData(data.user);
                        navigate(from, { replace: true });
                    } else {
                        toast.error(data.message);
    
                    }
                })

        } else {
            toast.error("confirm password doesn't match")
        }
    }

    

    return (
        <form onSubmit={onSubmit}>
            <p className='my-3 text-lg text-primary-focus'>User information</p>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 ' >
                <InputField
                    label='Full name'
                    name='name'
                    placeholder='Enter your full name'
                    onChange={handleChange}
                />

                <InputField
                    type='number'
                    label='Age'
                    name='age'
                    placeholder='Enter your age'
                    onChange={handleChange}
                />

                <InputField
                    type='email'
                    label='Email'
                    name='email'
                    placeholder='Enter your email'
                    onChange={handleChange}
                />
                <InputField

                    label='Phone'
                    name='phone'
                    placeholder='Enter your contact number'
                    onChange={handleChange}
                />
            </div>

            <InputField
                label='Address'
                name='address'
                placeholder='Enter your address'
                onChange={handleChange}
            />

            <p className='my-3 text-lg text-primary-focus'>Vehicle information</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>


                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">
                            Vehicle Type
                        </span>
                    </label>
                    <select
                        className="select w-full input-bordered text-[12px] h-auto py-2"
                        name='vehicleType'
                        onChange={handleChange}
                        required
                    >
                        <option disabled selected>Select Vehicle Type</option>
                        <option value='car'>Car</option>
                        <option value='bike' >Bike</option>

                    </select>

                </div>



                <InputField
                    label='Vehicle name'
                    name='vehicleName'
                    placeholder='Enter your vehicle name'
                    onChange={handleChange}
                />
                <InputField
                    label='Vehicle Model'
                    name='model'
                    placeholder='Enter your vehicle model'
                    onChange={handleChange}
                />
                <InputField
                    label='Vehicle name plate'
                    name='namePlate'
                    placeholder='Enter your vehicle name plate'
                    onChange={handleChange}
                />

            </div>

            <p className='my-3 text-lg text-primary-focus'>Others information</p>

            <InputField
                label='Area'
                name='area'
                placeholder='Enter your ride area'
                onChange={handleChange}
            />

            <ImgInput
                label='Driving Licence Picture'
                photo={licencePic}
                setPhoto={setLicencePic}
            />
            <ImgInput
                label='NID Picture'
                photo={nidPic}
                setPhoto={setNidPic}
            />
            <ImgInput
                label='Profile Picture'
                photo={profilePic}
                setPhoto={setProfilePic}
            />

            <p className='my-3 text-lg text-primary-focus'>Password</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <InputField
                    type='password'
                    label='Password'
                    name='password'
                    placeholder='Enter your password'
                    onChange={handleChange}
                />
                <InputField
                    type='password'
                    label='Confirm Password'
                    name='confirm'
                    placeholder='Confirm your password'
                    onChange={handleChange}
                />
            </div>

            <button className='btn btn-primary block mx-auto my-5 px-10' type="submit">Sign Up</button>




        </form>
    );
};

export default SignupWithRider;