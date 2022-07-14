import React, { Suspense } from "react";
import Products from "../products/Products";
import Header from "../shared/Header";

const Home = () => (
  <>
    <Header />
    <Suspense fallback={<>Loading...</>}>
      <Products />
    </Suspense>
  </>
);

export default Home;
