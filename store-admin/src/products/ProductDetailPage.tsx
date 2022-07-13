import React from "react";
import Header from "../shared/Header";
import Product, { ProductPageProps } from "./Product";

const ProductDetailPage = ({ editable }: ProductPageProps) => (
  <>
    <Header />
    <Product editable={editable} />
  </>
);

export default ProductDetailPage;
