import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const { _id, productId, productName, price, buyerName, buyerEmail } = booking;

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://bike-resale-server.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // 'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [booking?.price])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        setCardError(error?.message || '')
        setSuccess('');
        setProcessing(true);

        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats! Your payment is completed.')

            //save payment
            const payment = {
                productId: productId,
                transactionId: paymentIntent.id,
                productName: productName,
                email: buyerEmail,
                name: buyerName,
                price: parseInt(price),
            }
            fetch(`https://bike-resale-server.vercel.app/payments/${_id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                    toast.success("Payment Successfully");
                    navigate('/dashboard/booking')

                })
            console.log(paymentMethod, processing);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn btn-success mt-5' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckForm;