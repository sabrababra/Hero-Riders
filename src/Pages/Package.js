import React from 'react';
import { Link } from 'react-router-dom';
import { packageData } from '../assets/mackData/services';

const Package = () => {

    return (
        <div className='w-11/12 lg:w-8/12 mx-auto my-10'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {
                    packageData.map(item => <div key={item.id}>
                        <div className="card w-full max-w-sm lg:max-w-lg  bg-white shadow-xl">
                            <div className='py-10'><h2 className="text-xl text-center">Order Information</h2></div>
                            <figure className="px-10 pt-10">
                                <img src={item?.img} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body text-start">
                                <p>package Name: {item?.name}</p>
                                <div className='flex justify-between'>
                                    <p>package Price: </p>
                                    <p>${item?.price}</p>

                                    <Link to={`/payment/${item.id}`} className='btn btn-primary'>Buy now</Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Package;