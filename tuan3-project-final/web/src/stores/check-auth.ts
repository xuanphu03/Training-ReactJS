import { redirect } from "react-router-dom";

const email = localStorage.getItem("user");

export const AuthRequire = () => {
  if (!email) {
    throw redirect("/login");
  }
  return null;
};

export const CheckNoAuth = () => {
  if (email) {
    throw redirect("/chat-box");
  }
  return null;
};
