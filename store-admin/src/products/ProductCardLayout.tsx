import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import React from "react";

interface Props {
  renderActions: () => EmotionJSX.Element;
  renderDetails: () => EmotionJSX.Element;
}

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(177, 210, 248)",
    borderRadius: 8,
    height: "5em",
    textDecoration: "none",
    position: "relative",
    color: "inherit",
    padding: 8,
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
  iconWrapper: css({
    marginLeft: "auto",
    display: "flex",
    gap: 8,
  }),
};

const ProductCardLayout = ({ renderDetails, renderActions }: Props) => {
  return (
    <div css={styles.wrapper}>
      {renderDetails()}
      <div css={styles.iconWrapper}>{renderActions()}</div>
    </div>
  );
};

export default ProductCardLayout;
