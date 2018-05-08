import {GET_ALL_CATEGORIES, GET_SUBCATEGORIES} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const CategoryRecord = Record({
    id: undefined,
    name: undefined,
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: true,
    hasMoreSubcategories: true,
    subcategories: new OrderedMap({}),
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (categoryState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    switch (type) {
        case GET_ALL_CATEGORIES: {
            if (response.data.next === null) {
                return categoryState.set('entries', arrToMap(response.data.results, CategoryRecord))
                                    .set('hasMoreEntries', false);
            }
            return categoryState.set('entries', arrToMap(response.data.results, CategoryRecord))
                                .set('hasMoreEntries', true);
        }
        case GET_SUBCATEGORIES: {
            if (response.data.next === null) {
                return categoryState.set('subcategories', arrToMap(response.data.results, CategoryRecord))
                                    .set('hasMoreSubcategories', false);
            }
            return categoryState.set('subcategories', arrToMap(response.data.results, CategoryRecord))
                                .set('hasMoreSubcategories', true);
        }
    }
    return categoryState;
}