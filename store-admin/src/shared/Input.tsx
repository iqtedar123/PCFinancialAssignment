import { css } from "@emotion/react";
import React, { useMemo } from "react";
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

const getStyles = (readOnly: boolean) => ({
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
      opacity: readOnly ? 0.5 : 1,
    }),
    [mq[0]]: {
      width: "auto",
    },
  }),
  label: css({
    fontWeight: 500,
  }),
});

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
  const styles = useMemo(() => getStyles(readOnly), [readOnly]);
  return (
    <div css={styles.wrapper}>
      {label && (
        <label htmlFor={name} css={styles.label}>
          {label}
        </label>
      )}
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
