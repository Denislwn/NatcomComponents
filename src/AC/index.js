import {
    GET_ALL_STOCKS, GET_NEXT_STOCKS,
    ADD_NEW_STOCK, GET_STOCK_DETAIL, EDIT_STOCK
} from "../constans";

export function getAllStocks() {
    return {
        type: GET_ALL_STOCKS,
        requestType: 'GET',
        callAPI: 'stocks/'
    }
}

export function getNextStocks(page) {
    return {
        type: GET_NEXT_STOCKS,
        requestType: 'GET',
        callAPI: `stocks/?page=${page}`
    }
}

export function addNewStock(data) {
    return {
        type: ADD_NEW_STOCK,
        requestType: 'POST',
        callAPI: `stocks/`,
        data: data
    }
}

export function getStockDetail(stockId) {
    return {
        type: GET_STOCK_DETAIL,
        requestType: 'GET',
        callAPI: `stocks/${stockId}/`,
    }
}

export function editStock(data) {
    return {
        type: EDIT_STOCK,
        data: data
    }
}
