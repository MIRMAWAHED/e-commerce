import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { useHistory } from 'react-router-dom';

const Card = (data) => {
    const product =data.data
    const router = useRouter();
    // const history = useHistory();

  const handleOnclick = () => {
    window.location.href = `/api/${product.id}`;
    
    // history.push('/fake-url'); // Your fake URL

    // Push a fake URL to the history without reloading the page
    window.history.pushState({}, '', '/fake-url');
    // router.pushState(`/api/${product.id}`,'/');
    // router.push(`/api/${product.id}`)
    // router.replace("/fake-url")
  };
    return (

            <div onClick={handleOnclick}  className="hover:shadow-2xl cursor-pointer	 custom-anime flex flex-col justify-center items-center p-6 border w-10/12 sm:w-11/12 md:w-11/12 m-6 c-h rounded-lg shadow-md bg-white">
                <Image src={product.image} alt={product.title}
                    width={160} 
                      height={160} 
                      className="object-cover hover:saturate-200	"
                />
                <p></p>
                <h2 className="text-xl font-bold mt-10 hover:font-bold title  hover:text-slate-300">{product.title}</h2>
                <p className="text-gray-900 text-xl my-4 font-semibold">₹{product.price}</p>
                <p className="text-gray-600">Rating: {product.rating.rate} (based on {product.rating.count} reviews)</p>
                {/* <p className="text-gray-700 mt-5 description">{product.description}</p> */}

            </div>


        
    )
}

export default Card
