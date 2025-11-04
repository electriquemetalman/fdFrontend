import React, { useEffect } from 'react';
import { StoreContext } from './StoreContext';
import { food_list } from '../assets/assets';

const StoreContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = React.useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = React.useState("");

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  }

  useEffect(() => {
    if (localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;