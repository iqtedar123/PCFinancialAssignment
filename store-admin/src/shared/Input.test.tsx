import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

const onChange = jest.fn();

const props = {
  value: "",
  onChange,
  type: "text",
  name: "name",
  placeholder: "placeholder",
  required: false,
  label: "label",
  readOnly: false,
};

describe("Input", () => {
  it("renders Input", () => {
    render(<Input {...props} />);
    const element = screen.getByText(/label/i);
    expect(element).toBeInTheDocument();
  });

  it("handles onchange", () => {
    const value = "test123";
    render(<Input {...props} />);
    const element = screen.getByTestId("input");
    fireEvent.change(element, { target: { value } });
    expect(onChange).toHaveBeenCalled();
  });
  it("renders readOnly", () => {
    render(<Input {...props} readOnly={true} />);
    const element = screen.getByText(/label/i);
    expect(element).toBeInTheDocument();
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "test123" } });
    expect(onChange).not.toHaveBeenCalled();
  });
});
