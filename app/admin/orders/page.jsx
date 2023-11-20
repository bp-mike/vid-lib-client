import axios from "axios";

import queryString from "query-string";
import Orders from "@/components/admin/Orders";

const getOrders = async (searchParams) => {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    let request = await axios.get(
      `${process.env.APP_API_BASE_URL}/orders?${searchQuery}`
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

const AdminOrdersPage = async ({ searchParams }) => {
  const data = await getOrders(searchParams);

  return <Orders data={data} />;
};

export default AdminOrdersPage;
