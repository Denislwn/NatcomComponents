import {
    GET_ALL_STOCKS, GET_NEXT_STOCKS, ADD_NEW_STOCK,
    GET_STOCK_DETAIL, EDIT_STOCK, START, SUCCESS, FAIL
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
        case GET_ALL_STOCKS + SUCCESS: {
            if (response.data.next === null) {
                return stockState.set('stocks', arrToMap(response.data.results, StockRecord))
                    .set('hasMoreStocks', false)
                    .set('loaded', true)
                    .set('isLoading', false);
            }
            return stockState.set('stocks', arrToMap(response.data.results, StockRecord))
                .set('hasMoreStocks', true)
                .set('loaded', true)
                .set('isLoading', false)
        }
        case GET_ALL_STOCKS + START: {
            return stockState.set('isLoading', true)
        }
        case GET_NEXT_STOCKS + SUCCESS: {
            const stocksMap = arrToMap(response.data.results, StockRecord);
            const stocksList = stockState.stocks.merge(stocksMap);
            if (response.data.next === null) {
                return stockState.set('stocks', stocksList)
                    .set('hasMoreStocks', false)
                    .set('loaded', true)
            }
            return stockState.set('stocks', stocksList)
                .set('loaded', true)
        }
        case ADD_NEW_STOCK + SUCCESS: {
            let arr = [];
            arr.push(response.data);
            arr = arrToMap(arr, StockRecord);
            arr = stockState.stocks.concat(arr);
            return stockState.set('stocks', arr);
        }
        case GET_STOCK_DETAIL + START: {
            return stockState.set('isLoading', true)
        }
        case GET_STOCK_DETAIL + SUCCESS: {
            return stockState.set('stock', response.data)
                .set('loaded', true)
                .set('isLoading', false)
        }
        case EDIT_STOCK: {
            return stockState.set('stock', data);
        }
    }
    return stockState;
}