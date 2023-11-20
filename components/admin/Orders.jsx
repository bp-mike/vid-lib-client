"use client"

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";

const Orders = ({ data }) => {
  const orders = data.orders
  const { deleteOrder, error, clearErrors } = useContext(OrderContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.totalOrders} {data?.totalOrders === 1 ? "Order" : "Orders"}
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr className="bg-white">
              <td className="px-6 py-2">{order?.OrderNumber}</td>
              <td className="px-6 py-2">${order?.User?.userName}</td>
              <td className="px-6 py-2">Pending</td> {/* TODO add status on schema */}
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/orders/${order?.OrderNumber}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer" 
                  onClick={() => deleteHandler(order?.OrderNumber)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-6">
      <CustomPagination
          totalCount={data?.totalOrders}
          pageSize={data?.pageSize}
        />
      </div>
    </div>
  );
};

export default Orders;
