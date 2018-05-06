import {BaseApi} from "../services/base";

export default store => next => action => {
    const {callAPI, requestType, type} = action;
    if (!requestType) {
        return next(action);
    }

    const baseApi = new BaseApi();

    switch (requestType) {
        case 'GET': {
            baseApi
                .get(callAPI)
                .then(response => next({type, response}));
            break;
        }
        case 'POST': {
            const {data} = action;
            baseApi
                .post(callAPI, data)
                .then(response => next({type, response}));
            break;
        }
        case 'PUT': {
            const {data} = action;
            baseApi
                .put(callAPI, data)
                .then(response => next({type, response}));
            break;
        }
    }

}
