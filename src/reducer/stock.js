import {
    GET_ALL_STOCKS, GET_NEXT_STOCKS, ADD_NEW_STOCK,
    GET_STOCK_DETAIL, EDIT_STOCK
} from "../constans";
import {Record, OrderedMap} from "immutable"
import {arrToMap} from "../helpers";

const StockRecord = Record({
    id: undefined,
    name: undefined,
    address: undefined,
    main: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreStocks: true,
    stock: null,
    stocks: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (stockState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    switch (type) {
        case GET_ALL_STOCKS: {
            if (response.data.next === null) {
                return stockState.set('stocks', arrToMap(response.data.results, StockRecord))
                    .set('hasMoreStocks', false);
            }
            return stockState.set('stocks', arrToMap(response.data.results, StockRecord));
        }
        case GET_NEXT_STOCKS: {
            const stockList = stockState.stocks.concat(arrToMap(response.data.results, StockRecord));
            if (response.data.next === null) {
                return stockState.set('stocks', stockList)
                    .set('hasMoreStocks', false);
            }
            return stockState.set('stocks', stockList);
        }
        case ADD_NEW_STOCK: {
            let arr = [];
            arr.push(response.data);
            arr = arrToMap(arr, StockRecord);
            arr = stockState.stocks.concat(arr);
            return stockState.set('stocks', arr);
        }
        case GET_STOCK_DETAIL: {
            return stockState.set('stock', response.data);
        }
        case EDIT_STOCK: {
            return stockState.set('stock', data);
        }
    }
    return stockState;
}