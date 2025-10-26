import React, { useEffect } from 'react';
import { StoreContext } from './StoreContext';
import { food_list } from '../assets/assets';

const StoreContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = React.useState({});

  const addToCart = (itemId) => {
    if(!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
  }

  useEffect(() => {
    console.log(cartItems);
  },[cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;