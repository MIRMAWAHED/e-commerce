import { NextResponse } from 'next/server';
import ConnectDB from '../../../lib/Database';
import User from '../../../lib/mongodb'; // Your User model

export async function POST(req) {
  await ConnectDB();

  const { email, productId, quantity } = await req.json();

  if (!email || !productId) {
    return NextResponse.json({ message: 'Email and Product ID are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const existingItem = user.cart.find(item => item.productId.toString() === productId);

    if (!existingItem) {
      return NextResponse.json({ message: 'Item not found in cart' }, { status: 404 });
    }

    if (quantity <= 0) {
      // If quantity is zero or negative, remove the item from the cart
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    } else {
      // Reduce the quantity of the item in the cart
      existingItem.quantity -= quantity;
      if (existingItem.quantity <= 0) {
        // If quantity becomes zero or negative after reduction, remove the item from the cart
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
      }
    }

    await user.save();

    return NextResponse.json({ message: 'Item removed/quantity reduced from cart', cart: user.cart }, { status: 200 });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
