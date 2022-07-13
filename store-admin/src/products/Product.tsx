import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { Product as ProductType } from "../shared/constants";
import { getProduct } from "../shared/api";
import IconButton from "../shared/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface ProductPageProps {
  editable?: boolean;
}

const Product = ({ editable = false }: ProductPageProps) => {
  const [isEditable, setIsEditable] = useState(editable);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  // Get latest product details
  const fetchProduct = useCallback(async () => {
    if (id) {
      const product = await getProduct(id);
      setProduct(product ?? undefined);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct().catch(console.error);
  }, [fetchProduct]);

  const onSubmit = () => {};

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

  return (
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
        readOnly={!isEditable}
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
  );
};

export default Product;
