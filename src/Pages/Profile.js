import React, { useEffect } from 'react';
import useImg from '../assets/img/banner.jpg';
import useUser from '../hook/useUser';

const Profile = () => {
    const { user, setUserData, userLoading } = useUser();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [localStorage.getItem('user')])
    if (userLoading) {
        return <div>...Loading</div>
    }
    return (
        <div className='flex flex-col justify-center items-center w-11/12 lg:w-10/12 mx-auto my-5'>
            <div className="avatar">
                {user?.profilePic &&
                    <div className="w-32 rounded-full">
                        <img src={user?.profilePic.base64} alt='' />
                    </div>
                }
            </div>
            <div className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-8/12'>
                <h1 className='text-lg mb-2'><span className='font-semibold'>Name:</span>{user?.name}</h1>
                <h1 className='text-lg mb-2'><span className='font-semibold'>Age:</span>{user?.age}</h1>
                <h1 className='text-lg mb-2'><span className='font-semibold'>Email:</span>{user?.email}</h1>
                {user?.phone &&
                    <h1 className='text-lg mb-2'><span className='font-semibold'>Phone:</span>{user?.phone}</h1>}
            </div>
            {user?.address &&
                <div className='grid grid-cols-1 gap-4 w-full lg:w-8/12'>
                    <h1 className='text-lg mb-2'><span className='font-semibold'>Address:</span>{user?.address}</h1>
                </div>
            }

            <div className='w-full my-5'>
                <div className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-8/12 mx-auto'>
                    { user?.vehicleType && <h1 className='text-lg mb-2'><span className='font-semibold'>Vehicle Type:</span>{user?.vehicleType}</h1>}
                    {user?.userRole === 'rider' &&
                        <>
                            <h1 className='text-lg mb-2'><span className='font-semibold'>Vehicle name:</span>{user?.vehicleName}</h1>
                            <h1 className='text-lg mb-2'><span className='font-semibold'>Vehicle Model:</span>{user?.model}</h1>
                            <h1 className='text-lg mb-2'><span className='font-semibold'>Vehicle name plate:</span>{user?.namePlate}</h1>
                        </>

                    }                </div>
                {
                    user?.area && <div className='grid grid-cols-1 gap-4 w-full lg:w-8/12 mx-auto'>
                        <h1 className='text-lg mb-2'><span className='font-semibold'>Area:</span>{user?.area}</h1>
                    </div>
                }
            </div>

            <div className='flex flex-col my-5 w-full lg:w-8/12'>

                {user?.licencePic &&
                    <div>
                        <h1 className='text-lg mb-2 font-semibold'>Driving Licence Picture</h1>
                        <div className="avatar">
                            <div className="w-72 rounded-full">
                                <img src={user?.licencePic.base64} alt='' />
                            </div>
                        </div>
                    </div>
                }
                { user?.nidPic &&
                    <div>
                    <h1 className='text-lg mb-2 font-semibold'>NID Picture</h1>
                    <div className="avatar">
                        <div className="w-72 rounded-full">
                            <img src={user?.nidPic.base64} alt='' />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Profile;