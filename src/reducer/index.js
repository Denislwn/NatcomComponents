import {combineReducers} from "redux";
import stocks from "./stock";

export default combineReducers({
    stocks: stocks,
});