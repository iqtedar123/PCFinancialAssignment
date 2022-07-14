import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import React from "react";

interface Props {
  header: string;
  renderContent: () => EmotionJSX.Element;
}

const styles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  header: css({
    textAlign: "center",
    color: "#3e4684",
  }),
};

const PageLayout = ({ header, renderContent }: Props) => {
  return (
    <div css={styles.wrapper}>
      <h1 css={styles.header}>{header}</h1>
      {renderContent()}
    </div>
  );
};

export default PageLayout;
