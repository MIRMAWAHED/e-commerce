// src/context/AppContext.js
'use client'
import { createContext, useState,useEffect } from 'react';

export const AppContext = createContext();
export const AppContextFun = createContext();



export const AppProvider = ({ children }) => {
  const [state, setState] = useState({ filters: { Categories: "all",price:{min:null,max:null},star:null }, searchInput: '',top:'top3',login:false,email:'' });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const removeFromCart = async ( productId, quantity) => {
    const email=state.email
    try {
      const response = await fetch('/api/cart/sub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId, quantity }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Item removed/quantity reduced from cart:', data);
        cartInfo()
        // Handle success
      } else {
        const data = await response.json();
        console.error('Error removing item from cart:', data.message);
        // Handle error
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error
    }
  };
  
  const addToCart = async (productId,name,quantity,price,image) => {
    console.log(state.email)
    if (state.email ==='' ) {
      console.log('Email is required to add to cart');
      return;
    }
    if ( !productId || !name || !quantity || !price || !image ) {
      console.error('all product details required to add to cart');
      return;
    }
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: state.email, productId ,name ,quantity , price ,image }),
    });

    if (response.ok) {
      console.log('Item added to cart successfully');
      cartInfo()

    } else {
      console.error('Failed to add item to cart');
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }; 
  

  const cartInfo = async () => {
    if (!state.email) {
      console.log('Email is required to fetch cart information');
      return;
    }

    try {
      const response = await fetch(`/api/cart/info?email=${state.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        console.error('Failed to fetch cart information');
      }
    } catch (error) {
      console.error('Error fetching cart information:', error);
    }
  };
  useEffect(() => {
    cartInfo();
  }, [state.email]);

  return (
    <AppContext.Provider value={{ state, isSidebarVisible, toggleSidebar,addToCart ,cart,cartInfo,setCart,removeFromCart }}>
      <AppContextFun.Provider value={setState}>
        {children}
      </AppContextFun.Provider>
    </AppContext.Provider>
  );
};
