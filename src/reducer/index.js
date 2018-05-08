import {combineReducers} from 'redux';

import stocks from './stock';
import suppliers from './supplier';
import categories from './category';

export default combineReducers({
    stocks,
    suppliers,
    categories
});