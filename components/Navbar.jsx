'use client';
import React from 'react'
import { AppContext, AppContextFun } from '../app/AppContext';
import img from "../public/logo.png"
import { useContext, useState, useEffect, useRef } from 'react';
// import { useAppContext } from '@/components/AppContext';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
// import  {AppProvider}  from '../app/AppContext';
const Navbar = () => {
  const { state, toggleSidebar } = useContext(AppContext);
  const setState = useContext(AppContextFun);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);
  const suggestionBoxRef = useRef(null);
  const router= useRouter();
  const pathname = usePathname();
  const suggestions = [
    "Electronics", "Men's clothing",
    "Women's clothing", "Jewelery"
  ];

  function handleOnChange(e) {
    const input = e.target.value
    setState((prevState) => ({ ...prevState, searchInput: e.target.value }));
    // console.log("hieiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")

    console.log(state.searchInput);
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);


  }
  useEffect(() => {
    // To clear the suggestions when search input is cleared
    if (state.searchInput === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);

    }
  }, [state.searchInput]);
  function handleOnclick(suggestion) {
    setState((prevState) => ({ ...prevState, searchInput: suggestion }));
    // console.log("hiiii")
    // console.log("state==", state.searchInput)
    setShowSuggestions(false);


  }
  function signup(){
    // console.log('signup' ,pathname)
    router.push('/pages/auth/true')
  }
  function signin(){
    // console.log('signup' ,pathname)
    router.push('/pages/auth/false')
  }
  useEffect(() => {
    const resizableDiv = document.getElementById('logo-kinfolk');
    let currentWidth = 50;
    resizableDiv.style.backgroundColor = 'rgba(248, 248, 248, 0.637)'
    // console.log('nav path',pathname)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        currentWidth = 50;
        resizableDiv.style.top = '17vh';
        resizableDiv.style.backgroundColor = 'rgba(248, 248, 248, 0.637)'

      } else if (scrollY > 0 && scrollY <= 100) {
        currentWidth = 50 - (9 * scrollY) / 100;
        resizableDiv.style.top = (19 - (11 * scrollY) / 100) + 'vh';
      } else if (scrollY > 100 && scrollY <= 200) {
        currentWidth = 41.5 - (18.5 * (scrollY - 100)) / 100;
        resizableDiv.style.top = (11 - (8 * (scrollY - 100)) / 100) + 'vh';
      } else {
        currentWidth = 23;
        resizableDiv.style.top = '1.4vh';
        resizableDiv.style.backgroundColor = 'white'
      }

      currentWidth = Math.max(10, Math.min(50, currentWidth));
      resizableDiv.style.width = currentWidth + '%';
    };

    if (pathname === '/' && state.searchInput ==='' ) {
      // console.log('if inside=',pathname)
      
      window.addEventListener('scroll', handleScroll);

    }
    else{
      resizableDiv.style.width =Math.max(10, Math.min(50, 23))+'%'
      resizableDiv.style.top = '1.4vh';
        resizableDiv.style.backgroundColor = 'white'
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, state.searchInput]);
  useEffect(() => {
    if (searchBarRef.current && suggestionBoxRef.current) {
      const updateSuggestionBoxPosition = () => {
        const searchBarRect = searchBarRef.current.getBoundingClientRect();
        // console.log('width', searchBarRect.current)
        suggestionBoxRef.current.style.width = `${searchBarRect.width}px`;
        suggestionBoxRef.current.style.top = `${searchBarRect.bottom}px`;
        suggestionBoxRef.current.style.left = `${searchBarRect.left}px`;
      };

      updateSuggestionBoxPosition();

      if (state.searchInput !== '') {

        searchBarRef.current.style.width = '23%';
        searchBarRef.current.style.top = '1vh';
        searchBarRef.current.style.backgroundColor = 'white';
        // const searchBarRect2 = searchBarRef.current.getBoundingClientRect();

        // suggestionBoxRef.current.style.width = `${searchBarRect2.width}px`;
        // suggestionBoxRef.current.style.top = `${searchBarRect2.bottom}px`;
        // suggestionBoxRef.current.style.left = `${searchBarRect2.left}px`;

        setTimeout(updateSuggestionBoxPosition, 100);

        // updateSuggestionBoxPosition();
        // Re-calculate after style changes
      }
    }
  }, [state.searchInput, showSuggestions]);
  return (
    <div className=' w-100 h-16  bg-zinc-700	flex justify-center items-center sticky top-0 z-10 left-0 w-screen'>
      {/* <h3 >Logo</h3> */}
      <div className='grow flex'> 
           <Image className=' text-white  mt-2 cursor-pointer ' onClick={()=>{router.push('/')}} src={img.src} width={100} height={100}></Image>
           <button className='text-white mx-3' onClick={toggleSidebar}>toggle</button>

      </div>
      <input onChange={handleOnChange}
        value={state.searchInput}
        id="logo-kinfolk"
        ref={searchBarRef}

        className={` ${state.top} bg-blur placeholder:text-black text-black font-extralight search-input border-0 h-10 w-5/12 rounded-3xl focus:outline-none p-4 m-3 focus:rounded-none  `}
        placeholder='Search products......' type="text"
        onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} />
      {showSuggestions && (
        <ul className='suggestions w-5/12 max-h-52' ref={suggestionBoxRef}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className=' hover:bg-gray-200 cursor-pointer text-wrap '
              value={suggestion}
              onClick={() => {
                console.log(`Clicked on ${suggestion}`);
                handleOnclick(suggestion);
              }}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {/* <button className='text-white' onClick={()=>handleOnclick('search')}>Search</button> */}
      <div className=" grow text-white flex justify-center gap-2">
        {state.login === false? <><button className='' onClick={signup}>SignUp</button>
        <button className='mx-1' onClick={signin}>SignIn</button></>: 
        <img src='/cart.png' className=' size-8 cursor-pointer' onClick={()=>{router.push("/pages/cart")}}/>
        }
      </div>
    </div>
  )
}

export default Navbar
