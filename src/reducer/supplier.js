import {
    ADD_NEW_SUPPLIER, EDIT_SUPPLIER, GET_ALL_SUPPLIERS,
    GET_NEXT_SUPPLIERS, GET_SUPPLIER_DETAIL
} from "../constans";
import {OrderedMap, Record} from "immutable";
import {arrToMap} from "../helpers";

const SupplierRecord = Record({
    id: undefined,
    name: undefined,
    inn: undefined,
    comment: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreSuppliers: true,
    supplier: null,
    suppliers: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (suppliersState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    switch (type) {
        case GET_ALL_SUPPLIERS: {
            if (response.data.next === null) {
                return suppliersState.set('suppliers', arrToMap(response.data.results, SupplierRecord))
                                     .set('hasMoreSuppliers', false);
            }
            return suppliersState.set('suppliers', arrToMap(response.data.results, SupplierRecord))
                                 .set('hasMoreSuppliers', true);
        }
        case GET_NEXT_SUPPLIERS: {
            const suppliersMap = arrToMap(response.data.results, SupplierRecord);
            const suppliersList = suppliersState.suppliers.merge(suppliersMap);
            if (response.data.next === null) {
                return suppliersState.set('suppliers', suppliersList)
                                     .set('hasMoreSuppliers', false);
            }
            return suppliersState.set('suppliers', suppliersList);
        }
        case ADD_NEW_SUPPLIER: {
            let arr = [];
            arr.push(response.data);
            arr = arrToMap(arr, SupplierRecord);
            arr = suppliersState.suppliers.concat(arr);
            return suppliersState.set('suppliers', arr);
        }
        case GET_SUPPLIER_DETAIL: {
            return suppliersState.set('supplier', response.data);
        }
        case EDIT_SUPPLIER: {
            return suppliersState.set('supplier', data);
        }
    }
    return suppliersState;
}