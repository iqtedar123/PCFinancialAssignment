import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { Product as ProductType } from "../shared/constants";
import { getProduct, updateProduct } from "../shared/api";
import IconButton from "../shared/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { notify, ToastType } from "../shared/Toast";
import PageLayout from "../shared/PageLayout";

export interface ProductPageProps {
  editable?: boolean;
}

const Product = ({ editable = false }: ProductPageProps) => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(editable);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  // Get latest product details
  const fetchProduct = useCallback(async () => {
    if (id) {
      const product = await getProduct(id);
      setProduct(product ?? undefined);
    }
  }, [id, setProduct]);

  useEffect(() => {
    fetchProduct().catch(console.error);
  }, [fetchProduct]);

  const onSubmit = React.useCallback(async () => {
    // Update product
    if (product) {
      const response = await updateProduct(product);
      if (response) {
        navigate("/");
      }
      notify(
        response ? "Updated product" : "Error saving. Try again.",
        response ? ToastType.success : ToastType.errror
      );
    }
  }, [product, navigate]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    if (product) {
      const newProduct: ProductType = {
        ...product,
        [property]: e.target.value,
      };
      setProduct(newProduct);
    }
  };

  // ID is always readOnly
  return (
    <PageLayout
      header={product ? `${product?.productName}` : ""}
      renderContent={() => (
        <Form onSubmit={onSubmit} submitLabel="Save" readOnly={!isEditable}>
          {!editable && (
            <IconButton
              label={"Edit"}
              onClick={() => setIsEditable(!isEditable)}
              icon={<FontAwesomeIcon icon={solid("pen")} />}
            />
          )}
          <Input
            name="productId"
            type="text"
            value={product?.productId || ""}
            placeholder={"7777"}
            label={"Product Id"}
            required
            readOnly={true}
            onChange={(e) => onChange(e, "productId")}
          />
          <Input
            name="productName"
            type="text"
            value={product?.productName || ""}
            required
            label={"Product Name"}
            readOnly={!isEditable}
            onChange={(e) => onChange(e, "productName")}
          />
          <Input
            name="price"
            type="number"
            value={product?.price ? (product?.price as unknown as string) : ""}
            required
            label={"Price"}
            readOnly={!isEditable}
            onChange={(e) => onChange(e, "price")}
          />
        </Form>
      )}
    />
  );
};

export default Product;
