import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import Root from 'Root';

function playList(state = [], action) {
    if (action.type === 'ADD_TRACK') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}

const store = createStore(playList);

ReactDOM.render((
        <BrowserRouter>
            <Root/>
        </BrowserRouter>),
    document.getElementById('root'));