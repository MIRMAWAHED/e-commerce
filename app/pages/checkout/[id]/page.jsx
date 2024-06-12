// // pages/checkout.js
// 'use client'
// import { useState } from 'react';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import StripeProvider from '../../../components/StripeProvider';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//     } else {
//       const { id } = paymentMethod;
//       try {
//         const { data } = await axios.post('/api/pay/charge', { id });
//         // Handle successful payment here (e.g., redirect to a success page)
//         console.log(data);
//       } catch (error) {
//         setError(error.response?.data?.message || 'Something went wrong');
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <form className='w-96' onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Pay'}
//       </button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };

// const CheckoutPage = () => {
//   return (
//     <StripeProvider>
//       <CheckoutForm />
//     </StripeProvider>
//   );
// };

// export default CheckoutPage;
// pages/checkout.js
'use client'
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/AppContext";
import dummydata from "@/app/data1";
import React from "react";
const CheckoutPage = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [Items, setItems] = useState([]);
  const { cart } = useContext(AppContext);
  useEffect(() => {
    if (parseInt(params.id) === -1) {
      setItems(cart);
    } else {
      const filteredItems = cart.filter(data => parseInt(data.productId) === parseInt(params.id));
      if (filteredItems.length === 0) {
        const a = dummydata.find(data => parseInt(data.id) === parseInt(params.id));
        if (a) {
          setItems([{ productId: a.id, quantity: 1, name: a.title, price: a.price }]);
        } else {
          console.log("Item not found in dummydata");
        }
      } else {
        setItems(filteredItems);
      }
    }
  }, [params.id, cart]);

  const handleCheckout = () => {
    setLoading(true);
    // console.log(Items)
    fetch("/api/pay/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Items: Items,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
        setLoading(false);
      });
  };

  return (
    <div className="w-screen bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="  min:h-1/6 w-3/4 flex bg-white flex-col justify-start items-center shadow-md rounded-xl p-4">
        <h1 className="m-2 text-2xl w-full border-b-2 border-zinc-700 text-center">Checkout</h1>
        <div className="grid grid-cols-4 w-full">
          <p className="text-center">Product Name</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Price</p>
          <p className="text-center">Amount</p>
          {Items.length !== 0 ? (
            Items.map((data, index) => (
              <>
                <p className="text-center">{data.name}</p>
                <p className="text-center">{data.quantity}</p>
                <p className="text-center">{data.price}</p>
                <p className="text-center">{parseInt(data.quantity) * parseFloat(data.price)}</p>
              </>
            ))
          ) : (
            <p>No Items</p>
          )}

        </div>
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? "Loading..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
