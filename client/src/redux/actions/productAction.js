import { GET_PRODUCTS } from "./actionTypes";

export const getProductsAction = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

;