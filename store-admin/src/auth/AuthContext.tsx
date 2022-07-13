import React from "react";

export interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  user: string;
  signin: (user: User) => Promise<boolean>;
  signout: () => Promise<boolean>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;
