import { getCookie, saveJWTInCookie } from "../login/login.utils";
import { API_ENDPOINT, Product } from "../shared/constants";

export const doGet = async (path: string) => {
  const jwtToken = getCookie("jwt-cookie");
  const response = await fetch(`${API_ENDPOINT}${path}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const responseJSON = await response.json();
  if (!responseJSON || response.status !== 200) {
    return undefined;
  }
  return responseJSON;
};

export const doPost = async (path: string, data: any) => {
  const jwtToken = getCookie("jwt-cookie");
  const response = await fetch(`${API_ENDPOINT}${path}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();
  if (![200, 201].includes(response.status)) {
    return undefined;
  }
  return responseJSON;
};

export const doDelete = async (path: string, data: any) => {
  const jwtToken = getCookie("jwt-cookie");
  const response = await fetch(`${API_ENDPOINT}${path}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();
  if (response.status !== 200) {
    return undefined;
  }
  return responseJSON;
};

export const getProducts = async () => {
  // Fetch all products and display them
  const response: Product[] = await doGet(`/products`);
  return response;
};

export const getProduct = async (productId: string) => {
  const productIds = [productId];
  const response: Product[] = await doGet(
    `/products/search?productIds=${productIds}`
  );
  return response ? response[0] : undefined;
};

export const addProduct = async (product: Product) => {
  try {
    const response = await doPost(
      "/products",
      product as unknown as Record<string, unknown>
    );
    return response;
  } catch (e) {
    return false;
  }
};

export const deleteProduct = async (productIds: string[]) => {
  const response = await doDelete("/products", { productIds });
  return response;
};

export const updateProduct = async (product: Product) => {
  const response = await doPost("/products/upsert", [product]);
  return response;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const { token, success } = await response.json();
    saveJWTInCookie({ token });

    return success;
  } catch (e) {
    return false;
  }
};

export const logout = async () => {
  saveJWTInCookie({ token: "" });
};
