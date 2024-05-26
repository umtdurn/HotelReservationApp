import {GET_PRODUCT  } from "../actions/actionTypes";


const detailPageReducer = (state = {} , action) => {
  switch (action.type) {
    case GET_PRODUCT:
      console.log("123");
      return action.payload;
    default:
      return state;
  }
};

export default detailPageReducer;