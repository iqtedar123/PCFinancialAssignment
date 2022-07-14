import { css } from "@emotion/react";
import React from "react";
import { Product } from "../shared/constants";

const styles = {
  linkWrapper: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    background: "rgb(177, 210, 248)",
    borderRadius: 8,
    height: "5em",
    textDecoration: "none",
    position: "relative",
    color: "inherit",
    padding: 8,
  }),
  price: css({
    marginLeft: 8,
  }),
};

const ProductCardDetails = ({ productId, productName, price }: Product) => (
  <a href={`/product/${productId}`} css={styles.linkWrapper} data-testid="link">
    <h4>{productName}</h4>
    <p css={styles.price}>${price}</p>
  </a>
);

export default ProductCardDetails;
