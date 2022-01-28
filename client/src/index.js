import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";

import App from "./components/App";
import reducers from './reducers';
import {BrowserRouter} from "react-router-dom";

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    // wrap the App in the Provider tag
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

