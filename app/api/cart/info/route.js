import { NextResponse } from 'next/server';
import User from '../../../lib/mongodb'; // Importing the User model
import ConnectDB from '../../../lib/Database';

export async function GET(req) {
  await ConnectDB();
  const { searchParams } = new URL(req.url);

  const email = searchParams.get('email');
// console.log(req.url,'---',email)
  if (!email) {
    return NextResponse.json({ message: 'Email is required to fetch cart information' }, { status: 400 });
  }

  try {
    // Fetch the user's cart information from the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart information:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
