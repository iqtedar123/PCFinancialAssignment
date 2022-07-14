import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const onClick = jest.fn();

const props = {
  label: "label",
  onClick,
  disabled: false,
  icon: <FontAwesomeIcon icon={solid("refresh")} data-testid="icon" />,
};

describe("IconButton", () => {
  it("renders IconButton", () => {
    render(<IconButton {...props} />);
    const element = screen.getByTestId(/icon/i);
    expect(element).toBeInTheDocument();
  });

  it("handles onClick", () => {
    render(<IconButton {...props} />);
    const element = screen.getByTestId("button");
    fireEvent.click(element);
    expect(onClick).toHaveBeenCalled();
  });
});
