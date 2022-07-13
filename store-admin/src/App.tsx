import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import "./App.css";
import NotFound from "./not-found/NotFound";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Home from "./home/Home";
import AddPage from "./add/AddPage";
import Loading from "./shared/Loading";
import ProductDetailPage from "./products/ProductDetailPage";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddPage />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RequireAuth>
                <ProductDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:id/edit"
            element={
              <RequireAuth>
                <ProductDetailPage editable={true} />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
