import { render, screen } from "@testing-library/react";
import React from "react";
import ProductCardLayout from "./ProductCardLayout";

const props = {
  renderDetails: () => <>Details</>,
  renderActions: () => <>Actions</>,
};

describe("ProductCardLayout", () => {
  it("renders", () => {
    render(<ProductCardLayout {...props} />);
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
  });
});
