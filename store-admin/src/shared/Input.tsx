import { css } from "@emotion/react";
import React from "react";
import { mq } from "./breakpoints";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  readOnly?: boolean;
}

const styles = {
  wrapper: css({
    background: "white",
    width: "25%",
    boxShadow: "0 0 2em #e6e9f9",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    borderRadius: "20px",
    color: "#4d4d4d",
    input: css({
      outline: "none",
      border: "none",
      fontSize: "100%",
    }),
    [mq[0]]: {
      width: "auto",
    },
  }),
};

const Input = ({
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  required = false,
  label,
  readOnly = false,
}: Props) => {
  return (
    <div css={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={!readOnly ? onChange : undefined}
          required={required}
          readOnly={readOnly}
          data-testid="input"
        />
      </div>
    </div>
  );
};

export default Input;
