import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../shared/constants";
import IconButton from "../shared/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { deleteProduct } from "../shared/api";
import { useNavigate } from "react-router-dom";

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(177, 210, 248)",
    borderRadius: 8,
    height: "5em",
    textDecoration: "none",
    position: "relative",
    color: "inherit",
    padding: 8,
    "&::after": {
      content: `''`,
      transition: `opacity 125 ease-in-out`,
      borderRadius: 8,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      background: "rgba(0,0,0,0.1)",
      opacity: 0,
    },
    "&:hover::after": {
      opacity: 1,
    },
    "&:focus-visible::after": {
      opacity: 1,
    },
    "&:focus-within::after": {
      opacity: 1,
    },
    "&:hover": {
      opacity: "100%",
    },
  }),
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
  iconWrapper: css({
    marginLeft: "auto",
    display: "flex",
    gap: 8,
  }),
};

interface Props extends Product {
  fetchProducts: () => void;
}
const ProductCard = ({
  productName,
  productId,
  price,
  fetchProducts,
}: Props) => {
  const navigate = useNavigate();

  const edit = () => {
    navigate(`/product/${productId}/edit`);
  };

  const deleteItem = async () => {
    const response = await deleteProduct([productId]);
    alert(
      response
        ? `Deleted item with productId: ${productId}`
        : "Error deleting, try again."
    );
    await fetchProducts();
  };

  return (
    <div css={styles.wrapper}>
      <a href={`/product/${productId}`} css={styles.linkWrapper}>
        <h4>{productName}</h4>
        <p css={styles.price}>${price}</p>
      </a>
      <div css={styles.iconWrapper}>
        <IconButton
          label={"Edit"}
          onClick={edit}
          icon={<FontAwesomeIcon icon={solid("pen")} />}
        />
        <IconButton
          label={"Delete"}
          onClick={deleteItem}
          icon={<FontAwesomeIcon icon={solid("trash-can")} />}
        />
      </div>
    </div>
  );
};

export default ProductCard;
