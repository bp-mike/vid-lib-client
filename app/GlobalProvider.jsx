"use client"
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="top-right" />
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </>
  );
}
