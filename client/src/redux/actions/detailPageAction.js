import { GET_PRODUCT } from "./actionTypes";

export const getProductAction = (product) => ({
  type: GET_PRODUCT,
  payload: product,
});
;