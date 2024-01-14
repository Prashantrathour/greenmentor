import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux"
import {reducer as userReducer} from "./user/reducer"
import {reducer as taskReducer} from "./task/reducer"
import {thunk} from "redux-thunk"
const rootreducer=combineReducers({userReducer,taskReducer})
const store=createStore(rootreducer,applyMiddleware(thunk))
export {store}