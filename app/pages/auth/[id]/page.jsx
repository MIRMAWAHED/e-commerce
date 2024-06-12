'use client'
import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import { useRouter  } from 'next/navigation';
import { AppContext ,AppContextFun } from '@/app/AppContext';

const page = ({params}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, toggleSidebar } = useContext(AppContext);
  const setState = useContext(AppContextFun);
  const [toggle,setToggle] = useState(params.id)
  const router = useRouter();
  const handleSignUp = async () => {
    console.log(email, password)
    if (!email || !password) {
      console.error('Email and password are required =-==-');
      return;
    }
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // handle successful signup, e.g., redirect to login page or dashboard
      // router.push('/login'); // replace with your desired route
      alert('singed up sucessfully')
      setState((prevState) => ({ ...prevState, login: true,email:email }));
      router.push('/')

    } else {
      // handle error
      const data = await response.json();
      console.error('Signup error:', data.message);
    }
  };
  const handleSignIn =async ()=>{
    console.log(email, password)
    if (!email || !password) {
      console.error('Email and password are required =-==-');
      return;
    }
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // handle successful signup, e.g., redirect to login page or dashboard
      // router.push('/login'); // replace with your desired route
      alert('singed In sucessfully')
      // console.log("resss==",response)
      setState((prevState) => ({ ...prevState, login: true,email:email }));
      router.push('/')
    } else {
      // handle error
      const data = await response.json();
      console.error('Signup error:', data.message);
    }
  }
  return (
    <div className='  w-screen sign-h flex justify-center items-center'>
      <div className='flex flex-col w-3/12 h-5/6 bg-zinc-300  justify-center items-center rounded-3xl'>
       {toggle ==='true' ? <h3 className=' font-extrabold text-4xl text-white mb-3'>SignUp</h3>: <h3 className=' font-extrabold text-4xl text-white mb-3'>SignIn</h3>}

        <input className=' outline-none m-1 rounded-xl w-10/12 p-2'
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder='Email'
          type="email"
          name=""
          id="" />
        <input className=' outline-none m-1 rounded-xl w-10/12 p-2'
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder='password'
          type="password"
          name=""
          id="" />
        {toggle ==='true' ? <button className=' mt-3 text-sky-500	hover:text-white' onClick={handleSignUp}>SignUp</button> :
          <button className=' mt-3 text-sky-500	hover:text-white' onClick={handleSignIn} >SignIn</button>
        }    
        <div>
       {toggle ==='true'  ? <><p>Already have an account </p> <p onClick={()=>{setToggle(false)}}>Sign In</p></>:<> <p>Don't have an account </p> <p onClick={()=>{setToggle(true)}}>Sign Up</p></>
      }
      </div>
                    
          </div>
      
    </div>
  )
}

export default page
