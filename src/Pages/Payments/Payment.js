import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckForm from './CheckForm';

const stripePromise = loadStripe('pk_test_51M93DhBQeoUKbqjzL93iuXMaUNEhlwKXU55ReIBQ2bxd5LQtT7THA1JotI5bVplGqoghEa5lew4tH2rhGfk45xMc00RGayjQnI');

const Payment = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState({});

    console.log(id);

    useEffect(() => {
        fetch(`https://bike-resale-server.vercel.app/singleBooking/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBooking(data)
            })
    }, [id])
    // _id, productImg, productName, price, sellerName, pay

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-white text-center text-3xl font-semibold my-10'>
                <span className='p-1 border-b-2 border-primary'>Payment <span className='text-primary'>Now</span></span>
            </h1>
            <h2 className='text-2xl text-center my-5 text-accent'>Hello {booking?.buyerName},<br /> You want to
                buy this products</h2>
            <div className='w-11/12 mx-auto pb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <div className="card w-full max-w-sm lg:max-w-lg  bg-white shadow-xl">
                        <div className='py-10'><h2 className="text-xl text-center">Order Information</h2></div>
                        <figure className="px-10 pt-10">
                            <img src={booking?.productImg} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body text-start">
                            <p>Product Name: {booking?.productName}</p>
                            <div className='flex justify-between'>
                                <p>Product Price: </p>
                                <p>$ {booking?.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full my-5 max-w-sm lg:max-w-lg shadow-2xl bg-white">
                        <div className="card-body">
                            <h2 className="text-xl text-center text-success font-semibold">Payment on Card</h2>
                            <div className='my-5'>
                                <h1 className='text-xl my-5'>Use Card:</h1>
                                {booking?._id && <Elements stripe={stripePromise}>
                                    <CheckForm booking={booking} />
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