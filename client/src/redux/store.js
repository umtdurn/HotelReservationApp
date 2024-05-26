import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers/index";
function store() {
    return createStore(reducers,
        composeWithDevTools(
            applyMiddleware()
        )
    );
}

export default store;