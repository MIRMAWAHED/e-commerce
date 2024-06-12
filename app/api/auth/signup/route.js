
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import User from '../../../lib/mongodb'; // Importing the User model
import ConnectDB from '../../../lib/Database';

export async function POST(req) {
  await ConnectDB();

  if (req.method !== 'POST') {
    // console.log('req=', req.method);
    return NextResponse.json({ message: `${req.method} Method not allowed` }, { status: 405 });
  }

  const { email, password } = await req.json(); // Parsing the request body as JSON

  if (!email || !password) {
    console.log("Email or password not provided:", { email, password });
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = await User.create({ email, password: hashedPassword ,cart:[] });
    console.log('User created:', newUser);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
