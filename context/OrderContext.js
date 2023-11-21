"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [canReview, setCanReview] = useState(false);

  const router = useRouter();

  const updateOrder = async (id, orderData) => {
    try {
      const request = await axios.post(`${process.env.APP_API_BASE_URL}/orders/${id}`, 
        orderData
      );

      if (request.data.success && request.data.message === "Order Updated Successfully") {
        // TODO TOAST
        setUpdated(true);
        router.replace(`/admin/orders/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const request = await axios.delete(`${process.env.APP_API_BASE_URL}/orders/${id}`);

      if (request.data.success && request.data.message === "Order Deleted Successfully") {
        // setUpdated(true);
        // todo getAllMovies
        router.replace("/admin/orders");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const canUserReview = async (id) => {
    if(id){
      return setCanReview(true)

      try {
        const request = await axios.patch(
          `${process.env.APP_API_BASE_URL}/canReview/${id}`,);
  
        if (request?.data?.success && request?.data?.message === "Successfully") {
          setCanReview(request?.data?.canReview)
        }
      } catch (error) {
        console.log(error.response);
        setError(error?.response?.data?.message);
      }

    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <OrderContext.Provider
      value={{
        error,
        updated,
        canReview,
        setUpdated,
        updateOrder,
        deleteOrder,
        canUserReview,
        clearErrors,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
