import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../shared/constants";
import IconButton from "../shared/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { deleteProduct } from "../shared/api";
import { useNavigate } from "react-router-dom";
import ProductCardLayout from "./ProductCardLayout";
import ProductCardDetails from "./ProductCardDetails";
import { useCallback } from "react";

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

  const edit = useCallback(() => {
    navigate(`/product/${productId}/edit`);
  }, [navigate, productId]);

  const deleteItem = useCallback(async () => {
    const response = await deleteProduct([productId]);
    await fetchProducts();
    alert(
      response
        ? `Deleted item with productId: ${productId}`
        : "Error deleting, try again."
    );
  }, [productId, fetchProducts]);

  const renderActions = useCallback(
    () => (
      <>
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
      </>
    ),
    [edit, deleteItem]
  );

  return (
    <ProductCardLayout
      renderActions={renderActions}
      renderDetails={() => (
        <ProductCardDetails
          productId={productId}
          productName={productName}
          price={price}
        />
      )}
    />
  );
};

export default ProductCard;
