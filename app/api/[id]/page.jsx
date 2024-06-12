'use client'
import React, { useState, useContext, useEffect } from 'react';
import dummydata from '../../data1';
import Image from 'next/image';
import { AppContext, AppContextFun } from '../../AppContext';
import { useRouter } from 'next/navigation';
// import PayPalButton from '@/components/PayPalButton';
// import RazorpayButton from '@/components/RazorpayButton';
const Page = ({ params }) => {
    const { addToCart, cartInfo, cart } = useContext(AppContext);
    const router = useRouter();
    const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: '0% 0%' });
    const [inCart, setInCart] = useState(false)
    useEffect(() => {
        const checkItemInCart = () => {
            cart.forEach((item) => {
                if (item.productId === params.id) {
                    setInCart(true);
                }
            });
        };

        checkItemInCart();
    }, [cart, params.id]);
    function handleCart(id, title, q, price, image) {
        addToCart(id, title, q, price, image)
    }
    const handleMouseMove = (e, imageSrc) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({ backgroundPosition: `${x}% ${y}%`, backgroundImage: `url(${imageSrc})` });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ backgroundPosition: '0% 0%', backgroundImage: 'none' });
    };
    function handleBuy() {
        router.push(`/pages/checkout/${params.id}`);
      }
      
    return (
        <div>
            {dummydata
                .filter((data) => data.id == params.id)
                .map((data) => (
                    <React.Fragment key={data.id}>
                        <div className="grid md:grid-cols-2 grid-cols-1 w-screen h-5/6">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className="relative "
                                    onMouseMove={(e) => handleMouseMove(e, data.image)}
                                    onMouseLeave={handleMouseLeave}
                                // style={{ width: '380px', height: '380px' }}
                                >
                                    <Image
                                        src={data.image}
                                        alt={data.title}
                                        width={380}
                                        height={380}
                                        className="object-cover m-4"
                                    />
                                </div>
                            </div>
                            {zoomStyle.backgroundPosition != '0% 0%' ?
                                <div
                                    className="m-55 w-full h-screen border bg-slate-400 border-gray-200 ml-4 "
                                    style={{
                                        backgroundSize: '200%',
                                        ...zoomStyle,
                                    }}
                                >
                                    <div
                                        className=" hover:cursor-text"
                                        onMouseMove={(e) => handleMouseMove(e, data.image)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ width: '200%', height: '200%' }}
                                    >

                                    </div>
                                </div> : <div className="flex w-full flex-col py-24 items-start">
                                    <h3 className="text-4xl text-b font-light p-1">
                                        {data.title}
                                        <p className="text-xl">★{data.rating.rate}({data.rating.count})</p>
                                    </h3>
                                    <h5 className="text-3xl my-5 md:my-7 font-bold">₹{data.price}</h5>
                                    <p className="flex  h-1/4 items-center mt-5">{data.description}</p>
                                    <div className="flex-grow"></div>
                                    <div className="relative top-24 text-2xl w-full flex justify-evenly items-center">
                                        {/* <RazorpayButton /> */}
                                        <button className="hover:text-slate-600 border border-white bg-yellow-400 p-3 rounded-xl hover:border-yellow-500" onClick={handleBuy}>Buy Now</button>
                                        {inCart == false ? <button className="hover:text-slate-600 border p-3 rounded-xl bg-orange-400 hover:border-orange-500" onClick={() => { handleCart(data.id, data.title, 1, data.price, data.image) }}> Add to Cart</button>
                                            : <button className="hover:text-slate-600 border p-3 rounded-xl bg-orange-400 hover:border-orange-500" onClick={() => { router.push('/pages/cart') }}> Go to Cart</button>


                                        }
                                    </div>
                                </div>}

                        </div>
                    </React.Fragment>
                ))}
        </div>
    );
};

export default Page;
