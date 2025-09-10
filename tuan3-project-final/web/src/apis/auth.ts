import type { LoginType } from "@/schema/schemas";
import axios from "axios";

export const fetchLoginApi = async (data: LoginType) => {
  const rs = await axios
    .post("http://localhost:3000/auth/login", data)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });
  return rs;
};
