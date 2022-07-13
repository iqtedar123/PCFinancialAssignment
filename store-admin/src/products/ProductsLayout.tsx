import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import React from "react";
import { mq } from "../shared/breakpoints";

const styles = {
  wrapper: css({
    margin: "0 25%",
    marginTop: 20,
    background: "#f1f7fe",
    padding: "2em",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30px",
    boxShadow: " 0 0 2em #e6e9f9",
    gap: "2em",
    height: "50vh",
    [mq[0]]: {
      margin: "0 16px",
      marginTop: 20,
      height: "100%",
    },
  }),
};

interface Props {
  renderContent: () => EmotionJSX.Element;
  renderHeader: () => EmotionJSX.Element;
}

const ProductsLayout = ({ renderContent, renderHeader }: Props) => {
  return (
    <div css={styles.wrapper}>
      {renderHeader()}
      {renderContent()}
    </div>
  );
};

export default ProductsLayout;
