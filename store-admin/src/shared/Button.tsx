import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { mq } from "./breakpoints";

const getStyles = (disabled?: boolean) => ({
  button: css({
    padding: "1em",
    background: "#3e4684",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontWeight: "600",
    width: "20%",
    cursor: "pointer",
    opacity: disabled ? 0.5 : 1,
    [mq[0]]: {
      width: "auto",
    },
  }),
});

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: Props) => {
  const styles = useMemo(() => getStyles(disabled), [disabled]);
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <button
      css={styles.button}
      onClick={handleClick}
      disabled={disabled}
      title={label}
    >
      {label}
    </button>
  );
};

export default Button;
