import {GET_ALL_CATEGORIES, GET_SUBCATEGORIES} from '../constans';

export function getAllCategories() {
    return {
        type: GET_ALL_CATEGORIES,
        requestType: 'GET',
        callAPI: 'categories/'
    }
}

export function getSubcategories(categoryId) {
    return {
        type: GET_SUBCATEGORIES,
        requestType: 'GET',
        callAPI: `categories/${categoryId}/subcategories/`
    }
}

