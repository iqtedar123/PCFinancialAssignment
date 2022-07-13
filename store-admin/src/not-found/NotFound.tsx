import { css } from "@emotion/react";
import React from "react";
import logo from "../assets/404.gif";

const styles = {
  wrapper: css({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }),
};
const NotFound = () => {
  return (
    <div css={styles.wrapper}>
      <h1>Oops. Page is missing.</h1>
      <img src={logo} alt="loading..." />
    </div>
  );
};

export default NotFound;
