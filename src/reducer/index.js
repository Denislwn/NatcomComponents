import {combineReducers} from 'redux';

import stocks from './stock';
import suppliers from './supplier';
import categories from './category';
import products from './product';

export default combineReducers({
    stocks,
    suppliers,
    categories,
    products
});