import { createContext } from "react";

export const AuthContext = createContext({
  name: "",
  userId: "",
  userType: "",
});
