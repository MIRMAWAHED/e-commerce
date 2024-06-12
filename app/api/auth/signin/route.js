import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import User from '../../../lib/mongodb'; // Importing the User model
import ConnectDB from '../../../lib/Database';
export async function POST(req) {
    
  await ConnectDB();

  const { email, password } = await req.json(); // Parsing the request body as JSON

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
