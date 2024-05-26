import { combineReducers } from "redux";
import productReducer from "./productReducer";
import detailPageReducer from "./detailPageReducer";

const reducers = combineReducers({
    products:productReducer,
    detailPage:detailPageReducer
});

export default reducers;