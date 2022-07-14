import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderWithRouter } from "../shared/renderWithRouter";
import ProductCard from "./ProductCard";
import * as API from "../shared/api";

const deleteSpy = jest.spyOn(API, "deleteProduct");

const productId = "product-id";
const productName = "product-name";
const price = 100;
const fetchProducts = jest.fn();

const props = {
  productId,
  productName,
  price,
  fetchProducts,
};

jest.spyOn(window, "alert").mockImplementation(() => {});
describe("ProductCard", () => {
  it("handles edit", () => {
    const render = () => renderWithRouter(() => <ProductCard {...props} />);
    render();
    fireEvent.click(screen.getByTestId("button-Edit"));
    expect(window.location.pathname).toBe(`/product/${productId}/edit`);
  });
  it("handles delete", () => {
    deleteSpy.mockResolvedValue(true);
    const render = () => renderWithRouter(() => <ProductCard {...props} />);
    render();
    fireEvent.click(screen.getByTestId("button-Delete"));
    expect(deleteSpy).toHaveBeenCalledWith([productId]);
  });
});
