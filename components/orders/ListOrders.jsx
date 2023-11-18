"use client";

import { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layouts/CustomPagination";
import CartContext from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";

const ListOrders = ({ data }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();

  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {data?.orders?.map((order) => (
        <OrderItem key={order.OrderNumber} order={order} />
      ))}

      <CustomPagination
          totalCount={data?.totalOrders}
          pageSize={data?.pageSize}
        />
    </>
  );
};

export default ListOrders;
