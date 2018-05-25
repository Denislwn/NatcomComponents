import {OrderedMap, Record} from "immutable";
import {GET_ALL_PRODUCTS, GET_NEXT_PRODUCTS, START, SUCCESS} from "../constans";
import {arrToMap} from "../helpers";

const ProductRecord = Record({
    id: undefined,
    main_image: undefined,
    stocks: undefined,
    name: undefined,
    vendor_code: undefined,
    unit: undefined,
    price_standard: undefined,
    price_good: undefined,
    price_best: undefined,
    item: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreProducts: true,
    products: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (productState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_PRODUCTS + START: {
            return productState.set('isLoading', true);
        }
        case GET_ALL_PRODUCTS + SUCCESS: {
            if (response.data.next === null) {
                console.log(response.data.next);
                return productState.set('products', arrToMap(response.data.results, ProductRecord))
                    .set('hasMoreProducts', false)
                    .set('loaded', true)
                    .set('isLoading', false);
            }
            return productState.set('products', arrToMap(response.data.results, ProductRecord))
                .set('hasMoreProducts', true)
                .set('loaded', true)
                .set('isLoading', false)
        }
        case GET_NEXT_PRODUCTS + START: {
            return productState.set('isLoading', true);
        }
        case GET_NEXT_PRODUCTS + SUCCESS: {
            const productsMap = arrToMap(response.data.results, ProductRecord);
            const productsList = productState.products.merge(productsMap);
            if (response.data.next === null) {
                return productState.set('products', productsList)
                    .set('hasMoreProducts', false)
                    .set('loaded', true)
            }
            return productState.set('products', productsList)
                .set('loaded', true)
        }
    }

    return productState;
}