import axios from "axios";

import UpdateOrder from "@/components/admin/UpdateOrder";

const getOrder = async (id) => {
  try {
    let request = await axios.get(
      `${process.env.APP_API_BASE_URL}/orders/${id}`
    );
    if (
      request.data.success &&
      request.data.message === "Order Fetched Successfully"
    ) {
      return request.data;
    }
  } catch (error) {
    throw "An unexpected Error occurred, please try again";
  }
};

const AdminOrderDetailsPage = async ({ params }) => {
  const data = await getOrder(params?.id);

  return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailsPage;
