import { render, screen } from "@testing-library/react";
import React from "react";
import ProductCardDetails from "./ProductCardDetails";

const productId = "product-id";
const productName = "product-name";
const price = 100;

const props = {
  productId,
  productName,
  price,
};

describe("ProductCardDetails", () => {
  it("renders", () => {
    render(<ProductCardDetails {...props} />);
    expect(screen.getByText(productName)).toBeInTheDocument();
    expect(screen.getByText(`$${price}`)).toBeInTheDocument();
    expect(screen.getByTestId("link").getAttribute("href")).toEqual(
      `/product/${productId}`
    );
  });
});
