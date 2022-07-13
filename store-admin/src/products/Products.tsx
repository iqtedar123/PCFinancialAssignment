import React, { useCallback, useEffect, useState } from "react";
import { getProducts } from "../shared/api";
import { Product } from "../shared/constants";
import ProductCard from "./ProductCard";
import ProductsHeader from "./ProductsHeader";
import ProductsLayout from "./ProductsLayout";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const products = await getProducts();
    setProducts(products ?? []);
  }, []);

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
        <></>
      ),
    [products, fetchProducts]
  );
  useEffect(() => {
    fetchProducts().catch(console.error);
  }, [fetchProducts]);
  return (
    <ProductsLayout
      renderContent={renderContent}
      renderHeader={() => (
        <ProductsHeader products={products} fetchProducts={fetchProducts} />
      )}
    />
  );
};

export default Products;
