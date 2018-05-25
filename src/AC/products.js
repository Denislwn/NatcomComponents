import {GET_ALL_PRODUCTS, GET_NEXT_PRODUCTS, ADD_NEW_PRODUCT} from "../constans";

export function getAllProducts() {
    return {
        type: GET_ALL_PRODUCTS,
        requestType: 'GET',
        callAPI: 'items/products/'
    }
}

export function getNextProducts(page) {
    return {
        type: GET_NEXT_PRODUCTS,
        requestType: 'GET',
        callAPI: `items/products/?page=${page}`
    }
}
