import { css } from "@emotion/react";
import React, { ReactNode } from "react";
import { mq } from "./breakpoints";
import Button from "./Button";

const styles = {
  formWrapper: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  }),
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
    [mq[0]]: {
      margin: "0 16px",
      marginTop: 20,
      height: "100%",
    },
  }),
};

interface Props {
  onSubmit: () => void;
  disabled?: boolean;
  submitLabel: string;
  children: ReactNode;
  readOnly?: boolean;
}

const Form = ({
  children,
  onSubmit,
  disabled,
  submitLabel,
  readOnly,
}: Props) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.formWrapper}>
        {children}
        {!readOnly && (
          <Button label={submitLabel} onClick={onSubmit} disabled={disabled} />
        )}
      </div>
    </div>
  );
};

export default Form;
