import { css } from "@emotion/react";

export const hover = css({
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
});
