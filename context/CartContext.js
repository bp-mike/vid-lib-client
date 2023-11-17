"use client";

import axios from "axios";
// import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    movie,
    title,
    price,
    image,
  }) => {
    const item = {
      movie,
      title,
      price,
      image,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.movie === item.movie
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.movie === isItemExist.movie ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.movie !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const saveOnCheckout = async ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();

    try {
      const request = await axios.post(
        `${process.env.APP_API_BASE_URL}/orders/checkout_session`,
        {
          items: cart?.cartItems,
        },      {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      if(request.data.success && request.data.message === "Checkout Session Successful") {
        window.location.href = request.data.url;
      }

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
