'use client'
import React from 'react'
import { useState ,useContext } from 'react'
import Image from 'next/image'
import img from '../../../public/pic1.jpg'
import { AppContext, AppContextFun } from '../../AppContext';
import { useRouter } from 'next/navigation'
const page = () => {
  // const [data, setData] = useState([[1, 'p1', 122, '/pic1.jpg'], [2, 'p2', 1, '/pic2.jpg'], [2, 'p3', 1, '/pic3.jpg']]);
  const {cart,removeFromCart ,addToCart} = useContext(AppContext);
  const router= useRouter();

  function minus(id){
    removeFromCart(id,1)
  //  console.log(cart)
  }
  function plus(id,name,quant,price,img){
    addToCart(id,name,1,price,img)
    // console.log(cart)
   }
  return (
    <div className='w-screen flex  justify-center  min-h-screen '>
      <div className="flex w-10/12 justify-center   ">
        <div className='flex  justify-center items-start w-9/12 pt-26 shadow-lg  '>

          <div className="grid grid-cols-4 w-10/12  shadow-2xl">
            <p className='text-center col-span-2' > </p>
            <p className='text-center'>price</p>
            <p className='text-center'>Quantity </p>

            {cart.map((item, index) => (
              <>
                <span className='text-center p-3 flex justify-center mb-2 cursor-pointer col-span-2' onClick={()=>{router.push(`/api/${item.productId}`)}}>
                  <img src={item.image} className='size-12 sm:size-24 mr-1' alt='img'/>             
                   <p className='text-center mb-2 cursor-pointer hidetitle' onClick={()=>{router.push(`/api/${item.productId}`)}}>{item.name}</p>

                </span>
                <p className='text-center mb-2 cursor-pointer' onClick={()=>{router.push(`/api/${item.productId}`)}}>${item.price}</p>

                <div className='flex justify-center items-center  mb-2'>
                  <button className=' text-3xl cursor-pointer text-green-900' onClick={()=>minus(item.productId)}>-</button>
                  <p className='text-center text-3xl  mx-2'>{item.quantity}</p>
                  <button className='text-3xl cursor-pointer text-green-800'  onClick={()=>plus(item.productId,item.name,item.quantity,item.price,item.image)}>+</button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default page
