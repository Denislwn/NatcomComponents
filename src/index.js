import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import store from "./store"
import {Provider} from "react-redux"

import Root from 'Root';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </Provider>),
        document.getElementById('root'));