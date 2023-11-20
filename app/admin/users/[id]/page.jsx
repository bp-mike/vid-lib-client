import axios from "axios";

import UpdateUser from "@/components/admin/UpdateUser";

const getUser = async (id) => {
  try {
    const request = await axios.get(
      `${process.env.APP_API_BASE_URL}/users/${id}`);

    if (request?.data?.success && request?.data?.message === "User Data Fetched Successfully") {
      return request.data;
    }
  } catch (error) {
    console.log(error.response);
  }
};

const AdminUserDetailsPage = async ({ params }) => {
  const data = await getUser(params?.id);

  return <UpdateUser user={data?.user} />;
};

export default AdminUserDetailsPage;
