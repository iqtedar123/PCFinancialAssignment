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
  icon: css({
    width: 16,
    height: 16,
  }),
  actions: css({
    display: "flex",

    gap: 30,
    marginBottom: 8,
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
      <h1>{products.length} products</h1>
      <div css={styles.actions}>
        <div css={styles.icon}>
          <IconButton
            label={"Add Product"}
            onClick={addProduct}
            icon={<FontAwesomeIcon icon={solid("plus")} />}
          />
        </div>
        <div css={styles.icon}>
          <IconButton
            label={"Refresh"}
            onClick={fetchProducts}
            icon={<FontAwesomeIcon icon={solid("refresh")} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
