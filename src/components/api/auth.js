import axios from "axios";
import { apiAddress, login_url } from "../../config";

export const loginApi = async ({ username, password }) => {
 try {
  const { data } = await axios.post(login_url, {
   email: username,
   password,
  });

  return { data };
 } catch (error) {
  return {
   error:
    error.response?.data?.error || error.message || "something went wrong",
  };
 }
};

export const getDecryptPass = async (password, token) => {
 try {
  const { data } = await axios.get(`${apiAddress}/passwds/copy`, {
   headers: {
    pass: password,
    Authorization: `Bearer ${token}`,
   },
  });

  return { data };
 } catch (error) {
  return {
   error:
    error.response?.data?.error || error.message || "something went wrong",
  };
 }
};
