import axios from "axios";

import queryString from "query-string";
import Users from "@/components/admin/Users";

const getUsers = async (searchParams) => {

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const request = await axios.get(
      `${process.env.APP_API_BASE_URL}/users?${searchQuery}`);

    if (request?.data?.success && request?.data?.message === "Users Fetched Successfully") {
      return request.data;
    }
  } catch (error) {
    console.log(error.response);
  }
};

const AdminUsersPage = async ({ searchParams }) => {
  const data = await getUsers(searchParams);

  return <Users data={data} />;
};

export default AdminUsersPage;
