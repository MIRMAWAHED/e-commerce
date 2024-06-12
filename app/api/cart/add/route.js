import { NextResponse } from 'next/server';
import User from '../../../lib/mongodb';
import ConnectDB from '../../../lib/Database';

export async function POST(req) {
  await ConnectDB();

  if (req.method !== 'POST') {
    return NextResponse.json({ message: `${req.method} Method not allowed` }, { status: 405 });
  }

  const { email, productId, name, quantity, price, image } = await req.json();

  if (!email || !productId || !name || !quantity || !price || !image) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const existingItem = user.cart.find(item =>{ 
      //  console.log(item,":::",item.productId,'...',productId)
      return item.productId.toString() == productId.toString()});

    if (existingItem) {
      // console.log("match",existingItem)
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, name, quantity, price, image });
    }

    await user.save();

    return NextResponse.json({ message: 'Item added to cart' }, { status: 200 });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
