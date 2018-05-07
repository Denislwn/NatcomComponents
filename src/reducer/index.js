import {combineReducers} from "redux";
import stocks from "./stock";
import suppliers from './supplier'

export default combineReducers({
    stocks: stocks,
    suppliers: suppliers,
});