// import { useContext } from "react";
import axios from "axios";
import ListOrders from "@/components/orders/ListOrders";
import queryString from "query-string";
// import AuthContext from "@/context/AuthContext";

const getOrders = async (searchParams) => {
  // const { user } = useContext(AuthContext);

  const urlParams = {
    page: searchParams.page || 1,
  };
  const user = 2 // TODO use session user

  const searchQuery = queryString.stringify(urlParams);

  try {
    let request = await axios.get(
      `${process.env.APP_API_BASE_URL}/orders/my-orders/${user}?${searchQuery}`
    );
    if (
      request.data.success &&
      request.data.message === "Orders Fetched Successfully"
    ) {
      return request.data;
    }
  } catch (error) {
    console.log(error);
    throw "An unexpected Error occurred, please try again";
  }
};

const MyOrdersPage = async ({ searchParams }) => {
  const data = await getOrders(searchParams);

  return <ListOrders data={data} />;
};

export default MyOrdersPage;
