import React from "react";
import { checkIsAuthenticated } from "../login/login.utils";
import { login } from "../shared/api";
import AuthContext, { User } from "./AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loggedInUser = checkIsAuthenticated();
  let [user, setUser] = React.useState<string>(
    loggedInUser ? loggedInUser : ""
  );

  let signin = async (newUser: User) => {
    const success: boolean = await login(newUser);
    if (success) {
      setUser(newUser.username);
    }
    return success;
  };

  let signout = async () => {
    setUser("");
    // TODO Implement logout
    // const success = await logout(user);
    // return success
    return true;
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
