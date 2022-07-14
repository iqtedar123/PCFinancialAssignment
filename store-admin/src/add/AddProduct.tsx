import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../shared/api";
import { onInputChange } from "../shared/constants";
import Form from "../shared/Form";
import Input from "../shared/Input";
import PageLayout from "../shared/PageLayout";
import { notify, ToastType } from "../shared/Toast";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const isDisabled = useMemo(
    () =>
      productId.length === 0 || productName.length === 0 || price.length === 0,
    [productId, productName, price]
  );
  const onSubmit = async () => {
    const response = await addProduct({
      productId,
      productName,
      price: Number(price),
    });
    // Navigate to home
    navigate("/");
    notify(
      response ? "New Product Created" : "Error, try again.",
      response ? ToastType.success : ToastType.errror
    );
  };

  return (
    <PageLayout
      header={"Fill out the below information to create a product."}
      renderContent={() => (
        <Form onSubmit={onSubmit} disabled={isDisabled} submitLabel="Add">
          <Input
            name="productId"
            type="text"
            value={productId}
            label={"Product Id"}
            onChange={(e) => onInputChange(e, setProductId)}
            required
          />
          <Input
            name="productName"
            type="text"
            value={productName}
            onChange={(e) => onInputChange(e, setProductName)}
            required
            label={"Product Name"}
          />
          <Input
            name="price"
            type="number"
            value={price}
            onChange={(e) => onInputChange(e, setPrice)}
            required
            label={"Price"}
          />
        </Form>
      )}
    />
  );
};

export default AddProduct;
