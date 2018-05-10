import {
    GET_ALL_CATEGORIES, GET_SUBCATEGORIES,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const CategoryRecord = Record({
    id: undefined,
    name: undefined,
});

const ReducerState = Record({
    isLoading: false,
    isLoadingSubcategories: false,
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
        case GET_ALL_CATEGORIES + START: {
            return categoryState.set('isLoading', true);
        }
        case GET_ALL_CATEGORIES + SUCCESS: {
            const categoriesMap = arrToMap(response.data.results, CategoryRecord);
            if (response.data.next === null) {
                return categoryState.set('entries', categoriesMap)
                                    .set('isLoading', false)
                                    .set('hasMoreEntries', false);
            }
            return categoryState.set('entries', categoriesMap)
                                .set('isLoading', false)
                                .set('hasMoreEntries', true);
        }
        case GET_SUBCATEGORIES + START: {
            return categoryState.set('isLoadingSubcategories', true);
        }
        case GET_SUBCATEGORIES + SUCCESS: {
            const subcategoriesMap = arrToMap(response.data.results, CategoryRecord);
            if (response.data.next === null) {
                return categoryState.set('subcategories', subcategoriesMap)
                                    .set('isLoadingSubcategories', false)
                                    .set('hasMoreSubcategories', false);
            }
            return categoryState.set('subcategories', subcategoriesMap)
                                .set('isLoadingSubcategories', false)
                                .set('hasMoreSubcategories', true);
        }
    }
    return categoryState;
}