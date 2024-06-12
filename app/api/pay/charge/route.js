// // pages/api/charge.js
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { id } = req.body;
//     try {
//       const payment = await stripe.paymentIntents.create({
//         amount: 1000, // Amount in cents (e.g., $10.00)
//         currency: 'usd',
//         payment_method: id,
//         confirm: true,
//       });
//       res.status(200).json({ success: true, payment });
//     } catch (error) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
// pages/api/create-checkout-session.js
// import { loadStripe } from "@stripe/stripe-js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

// export  async function POST(req, res) {
//   if (req.method === "POST") {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id);
//           return {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: storeItem.name,
//               },
//               unit_amount: storeItem.priceInCents,
//             },
//             quantity: item.quantity,
//           };
//         }),
//         success_url: `${process.env.CLIENT_URL}/success`,
//         cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       });
//       res.json({ url: session.url });
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
// import items from 'razorpay/dist/types/items';
import dummydata from '@/app/data1';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const storeItems = new Map(dummydata.map(item => [item.id, { priceInCents: item.price * 100, name: item.title }]));

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
  console.log('hi')

  try {
    const body = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.Items.map(item => {
        const storeItem = storeItems.get(parseInt(item.productId));
        console.log(storeItem,item)
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: storeItem.name,
              description : storeItem.name
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
          
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
