import React, { useCallback, useEffect, useState } from "react";
import { getProducts } from "../shared/api";
import { Product } from "../shared/constants";
import Loading from "../shared/Loading";
import { notify, ToastType } from "../shared/Toast";
import ProductCard from "./ProductCard";
import ProductsHeader from "./ProductsHeader";
import ProductsLayout from "./ProductsLayout";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const products = await getProducts();
    setProducts(products ?? []);
  }, []);

  useEffect(() => {
    fetchProducts().catch(() =>
      notify("Error fetching products. Try again later.", ToastType.errror)
    );
  }, [fetchProducts]);

  const renderContent = React.useCallback(
    () =>
      products.length > 0 ? (
        <>
          {products.map((product) => (
            <ProductCard
              {...product}
              key={product.productId}
              fetchProducts={fetchProducts}
            />
          ))}
        </>
      ) : (
        <Loading />
      ),
    [products, fetchProducts]
  );

  const renderHeader = React.useCallback(
    () => <ProductsHeader products={products} fetchProducts={fetchProducts} />,
    [products, fetchProducts]
  );
  return (
    <ProductsLayout renderContent={renderContent} renderHeader={renderHeader} />
  );
};

export default Products;
