import {
   createStore,
   applyMiddleware,
   combineReducers,
   // compose
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk];

// // For Development
const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

// For Production
// const store = createStore(
//     reducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//  );

export default store;
