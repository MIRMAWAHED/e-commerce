import React from 'react'
import Image from 'next/image'; // Import Next.js Image component if needed
// import Card from './Card';
import img from '../public/pic1.jpg'
import img2 from '../public/pic2.jpg'
import img3 from '../public/pic3.jpg'


const HomeL = ({ dummydata }) => {
  return (<>
    <div className=' w-screen flex flex-col justify-center items-center'>
      <section id="home" className="parallax w-screen" style={{ backgroundImage: `url(${img.src})` }}>
        <div className="content">
          <h1>Welcome to MyShop</h1>
          <p>Your one-stop shop for all your needs</p>
        </div>
      </section>
      <section id="categories">
        <h2>Shop by Category</h2>
        <div className="category parallax" style={{ backgroundImage: `url(${img2.src})` }}>
          <div className="content flex flex-col justify-center items-center">
            <h3>Electronics</h3>
            <div className="bg-cu w-9/12 p-7 rounded-xl bg-zinc-300"> 
            {dummydata.length > 0 ? (
              dummydata.filter((a) => {
                return a.id === 14
              }).map(data => (
                // <Card key={data.id} data={data} />
                <div className="image-container w-full font-light flex flex-col ">
                  {/* <Image  className="image-container" src={data.image} width={200} height={200}></Image> */}
                  <img  src={ data.image} className=' size-40' alt="" />
                  <p className='text-black flex h-full flex-col justify-center items-center'>{data.title}  <button className='text-black w-2/6 outline-black outline hover:outline-4 m-7'>Explore more</button></p>
                 

                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
            </div>
            
            {/* <p>Latest gadgets and devices </p> */}
          </div>
        </div>
        <div className="category parallax flex justify-start items-start " style={{ backgroundImage: `url(${img3.src})` }}>
          <div className="content  flex flex-col justify-start items-start">
            <h3>Fashion</h3>
            <div className="bg-cu w-9/12 p-7 rounded-xl bg-zinc-100"> 
            {dummydata.length > 0 ? (
              dummydata.filter((a) => {
                return a.id === 16
              }).map(data => (
                // <Card key={data.id} data={data} />
                <div className="image-container w-full font-light flex">
                  {/* <Image  className="image-container" src={data.image} width={200} height={200}></Image> */}
                  <img  src={ data.image} width={500} alt="" />
                  <p className='text-black flex h-full flex-col justify-center items-center text-xl'>{data.title} 
                  <p className='text-xs'>{data.description}</p>
                   <button className='text-black w-2/6 outline-black outline hover:outline-4 m-7'>Explore more</button>
                   </p>
                 

                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
           
            </div>
          </div>
        </div>
        <div className="category parallax" style={{ backgroundImage: `url(${img.src})` }}>
          <div className="content ">
            <h3>Home & Living</h3>
            <p>Furniture and decor</p>
          </div>
        </div>
      </section>
    </div>

  </>
  )
}

export default HomeL
