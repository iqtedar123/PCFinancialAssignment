import { css } from "@emotion/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../shared/constants";
import IconButton from "../shared/IconButton";

const styles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  actions: css({
    display: "flex",
    gap: 30,
    marginBottom: 8,
  }),
  h1: css({
    color: "#3e4684",
  }),
};

const ProductsHeader = ({
  products,
  fetchProducts,
}: {
  products: Product[];
  fetchProducts: () => void;
}) => {
  const navigate = useNavigate();

  const addProduct = () => {
    navigate("/add");
  };
  return (
    <div css={styles.wrapper}>
      <h1 css={styles.h1}>{products.length} products</h1>
      <div css={styles.actions}>
        <IconButton
          label={"Add Product"}
          onClick={addProduct}
          icon={<FontAwesomeIcon icon={solid("plus")} />}
        />
        <IconButton
          label={"Refresh"}
          onClick={fetchProducts}
          icon={<FontAwesomeIcon icon={solid("refresh")} />}
        />
      </div>
    </div>
  );
};

export default ProductsHeader;
