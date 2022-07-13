export const API_ENDPOINT = "http://localhost:3000";

export interface Product {
  productName: string;
  productId: string;
  price: number;
}

export const onInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: React.Dispatch<React.SetStateAction<string>>
) => {
  callback(e.target.value);
};
