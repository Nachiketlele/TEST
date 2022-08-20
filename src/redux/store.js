import { legacy_createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { appreducer } from "./appreducer/appreducer";
import { authreducer } from "./authreducer/authreducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootreducer = combineReducers({
     data: appreducer,
     auth: authreducer
})


export const store = legacy_createStore(rootreducer,composeEnhancers(applyMiddleware(thunk)))