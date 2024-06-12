'use client'
import React from 'react'
import { AppContext, AppContextFun } from '../app/AppContext';

import { useContext, useState, useEffect } from 'react';
const Sidebar = () => {
    const {state,isSidebarVisible,toggleSidebar} = useContext(AppContext);
    const setState = useContext(AppContextFun);

    function handleOnclick(event) {
        console.log("clicked")
        const value = event.target.getAttribute("value");
        console.log(value)
        // setState(prevState => ({
        //     ...prevState,
        //     filter: {
        //         Categores: value
        //     }
        // }))
        setState(prevState => {
            // console.log({...prevState}); // Log the previous state
            return {
                ...prevState, // Spread the previous state
                filters: {
                    ...prevState.filters, // Spread the previous state of filters
                    Categories: value // Update Categories to a new value
                }
            };
        });
        
        console.log(state.filters.Categories)
    }
    function minchange(e){
        const a=e.target.value
        setState(prevState => {
            // console.log({...prevState}); // Log the previous state
            return {
                ...prevState, // Spread the previous state
                filters: {
                    ...prevState.filters, // Spread the previous state of filters
                    price:{
                        ...prevState.filters, // Spread the previous state of filters
                        min:a
                    } // Update Categories to a new value
                }
            };
        });
        console.log(state.filters.price.min)
    }
    function maxchange(e){
        const a=e.target.value
        setState(prevState => {
            // console.log({...prevState}); // Log the previous state
            return {
                ...prevState, // Spread the previous state
                filters: {
                    ...prevState.filters, // Spread the previous state of filters
                    price:{
                        ...prevState.filters, // Spread the previous state of filters
                        max:a
                    } // Update Categories to a new value
                }
            };
        });
        console.log(state.filters.price.max)
    }
    function handleRatingChange(e){
        const a=e.target.value
        setState(prevState => {
            // console.log({...prevState}); // Log the previous state
            return {
                ...prevState, // Spread the previous state
                filters: {
                    ...prevState.filters, // Spread the previous state of filters
                    star:a// Update Categories to a new value
                }
            };
        });
        console.log('star=',a)
    }
    function clearFun(){
        setState(prevState => {
            // console.log({...prevState}); // Log the previous state
            return {
                ...prevState, // Spread the previous state
                filters: { Categories: "all",price:{min:null,max:null},star:null }
            };
        });
        // console.log("searchip=",state.searchInput)
        // setState({  });
    }
    return (
      <div className={`sidebar 2xl:w-2/12 ${isSidebarVisible ? 'visible' : 'hidden'} absolute z-10 bg-white`}>
          <div className='sticky top-0 flex flex-col items-center c-side-h w-full  border-r-2	'>
            <div className='my-4 flex flex-col items-center border-b border-slate-300 w-60'>
                <h4 className='text-xl'>Categories</h4>
                <ul className='flex flex-col  justify-around h-44 items-center'>
                    <li  value="Electronics"  onClick={handleOnclick}>Electronics</li>
                    <li value="Men's clothing" onClick={ handleOnclick}>Men's clothing</li>
                    <li value="Women's clothing" onClick={ handleOnclick}>Women's clothing</li>
                    <li value="Jewelery" onClick={ handleOnclick}>Jewelery</li>
                </ul>

            </div>
         <form action="">
         <div className='my-4 flex flex-col items-center border-b border-slate-300 w-60'>
                <h4 className='text-xl'>Filter by price</h4>
                <h5 className='m-2'>Select range</h5>
                <div className='m-4'>

                    <input onChange={minchange} className='bg-slate-100 mx-2 min-w-9 max-w-20 text-center 	 focus:outline-none' type="number" placeholder='min' />
                    to
                    <input onChange={maxchange} className='bg-slate-100 mx-2 min-w-9 max-w-20 text-center focus:outline-none' type="number" placeholder='max' />
                </div>
            </div>
            <div className='my-4 flex flex-col items-center border-b border-slate-300 w-60'>
                <h4 className='text-xl'>Filter by rating</h4>
                {/* <h5 className='m-2'></h5> */}
                <div className='rating m-4 flex flex-col'>

                    <div><input type="radio" value="5" className="" onChange={handleRatingChange} name="rating" id="r5" /><label htmlFor="r5"> 5 star</label></div>
                    <div><input type="radio" value="4" className="" onChange={handleRatingChange} name="rating" id="r4" /><label htmlFor="r4"> 4 star & above</label></div>
                    <div><input type="radio" value="3" className="" onChange={handleRatingChange} name="rating" id="r3" /><label htmlFor="r3"> 3 star & above</label></div>
                    <div><input type="radio" value="2" className="" onChange={handleRatingChange} name="rating" id="r2" /><label htmlFor="r2"> 2 star & above</label></div>
                    <div><input type="radio" value="1" className="" onChange={handleRatingChange} name="rating" id="r1" /><label htmlFor="r1"> 1 star & above</label></div>


                </div>
            </div>
            <div className='flex justify-evenly w-full'>
                <button onClick={clearFun}>Clear</button>
                {/* <button>Apply</button> */}
            </div>
         </form>

        </div>
      </div>
    )
}

export default Sidebar
