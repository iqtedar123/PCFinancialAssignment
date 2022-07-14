import { css } from "@emotion/react";
import React from "react";

const styles = {
  button: css({
    padding: "1em",
    background: "#3e4684",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: 100,
  }),
  icon: css({
    background: "#3B5998",
    color: "white",
  }),
};

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon: any;
}

const IconButton = ({ onClick, disabled, icon }: Props) => {
  return (
    <button
      css={styles.button}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
