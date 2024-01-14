import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux"
import {reducer as userReducer} from "./user/reducer"
import {reducer as taskReducer} from "./task/reducer"
import {thunk} from "redux-thunk"
import profileReducer from "./userProfile/profileReducer"
const rootreducer=combineReducers({userReducer,taskReducer,profileReducer})
const store=createStore(rootreducer,applyMiddleware(thunk))
export {store}