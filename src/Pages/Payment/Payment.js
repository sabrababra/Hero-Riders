import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { packageData } from '../../assets/mackData/services';
import useUser from '../../hook/useUser';
import CheckForm from './CheckForm';

const stripePromise = loadStripe('pk_test_51L1p8ACcQVA8yAkmETfwkRuFoyz5y3xpDlFcO7SauwYSOwcE1FaOpEDLqwqVBpbZYyA9kIFweD00JJfAlIHmYE2z00oq05wA4f');

const Payment = () => {
    const params = useParams();
    const { user } = useUser();
    const [data, setData] = useState({});

    useEffect(() => {
        if (params.id) {
            packageData.forEach(item => {
                if (item.id === parseInt(params.id)) {
                    setData(item);
                }
            });
        }
    }, [params.id, user])




    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-white text-center text-3xl font-semibold my-10'>
                <span className='p-1 border-b-2 border-primary'>Payment <span className='text-primary'>Now</span></span>
            </h1>
            <h2 className='text-2xl text-center my-5 text-accent'>Hello {user?.name},<br /> You want to
                buy this package</h2>
            <div className='w-11/12 mx-auto pb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <div className="card w-full max-w-sm lg:max-w-lg  bg-white shadow-xl">
                        <div className='py-10'><h2 className="text-xl text-center">Order Information</h2></div>
                        <figure className="px-10 pt-10">
                            <img src={data?.img} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body text-start">
                            <p>package Name: {data?.name}</p>
                            <div className='flex justify-between'>
                                <p>package Price: </p>
                                <p>${data?.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full my-5 max-w-sm lg:max-w-lg shadow-2xl bg-white">
                        <div className="card-body">
                            <h2 className="text-xl text-center text-success font-semibold">Payment on Card</h2>
                            <div className='my-5'>
                                <h1 className='text-xl my-5'>Use Card:</h1>
                                {data?.id && <Elements stripe={stripePromise}>
                                    <CheckForm booking={data} user={user} />
                                </Elements>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;