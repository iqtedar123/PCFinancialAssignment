import React, { useState } from "react";
import Input from "../shared/Input";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Form from "../shared/Form";
import { notify, ToastType } from "../shared/Toast";
import PageLayout from "../shared/PageLayout";

interface StateType {
  from: { pathname: string };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = (location.state as StateType)?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    const success = await auth.signin({ username, password });
    if (success) {
      // Maybe show a toast here?
      navigate(from, { replace: true });
      notify("Welcome to Store Admin.", ToastType.success);
    } else {
      // Maybe show a toast here?
      console.log("Error");
      notify("Error logging in. Try again later.", ToastType.errror);
    }
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <PageLayout
      header={"Please check README for credentials."}
      renderContent={() => (
        <Form
          onSubmit={onSubmit}
          disabled={username.length === 0 || password.length === 0}
          submitLabel="Login"
        >
          <Input
            name="username"
            type="text"
            value={username}
            placeholder={"John Doe"}
            label={"Username"}
            onChange={onUsernameChange}
            required
          />
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            label={"Password"}
          />
        </Form>
      )}
    />
  );
};

export default Login;
