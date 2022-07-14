import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./api";
import { notify, ToastType } from "./Toast";

const styles = {
  header: css({
    backgroundColor: "#282c34",
    minHeight: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  }),
  link: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    textDecoration: "none",
    position: "relative",
    color: "inherit",
    padding: 8,
    marginRight: "auto",
    height: "100%",
    "&::after": {
      content: `''`,
      transition: `opacity 125 ease-in-out`,
      borderRadius: 8,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      background: "rgba(0,0,0,0.1)",
      opacity: 0,
    },
    "&:hover::after": {
      opacity: 1,
    },
    "&:focus-visible::after": {
      opacity: 1,
    },
    "&:focus-within::after": {
      opacity: 1,
    },
    "&:hover": {
      opacity: "100%",
    },
  }),
  logout: css({
    all: "unset",
  }),
  logoutWrapper: css({
    marginLeft: "auto",
  }),
  nav: css({
    marginRight: "auto",
  }),
};

const Header = () => {
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    // Perform logout
    await logout();
    navigate("/login");
    notify("Logged out!", ToastType.success);
  };
  return (
    <>
      <header css={styles.header} data-testid="header">
        <nav css={styles.nav}>
          <a href="/" css={styles.link} data-testid="home">
            Home
          </a>
        </nav>
        <div css={styles.logoutWrapper}>
          <button
            onClick={onLogoutClick}
            css={[styles.link, styles.logout]}
            data-testid="logout"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
