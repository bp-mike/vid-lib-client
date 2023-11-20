"use client";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import { MovieProvider } from "@/context/MovieContext"
import { OrderProvider } from "@/context/OrderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="top-right" />
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <MovieProvider>
              <SessionProvider>{children}</SessionProvider>
            </MovieProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
