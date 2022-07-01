import {Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import mesaggesReducer from "./messagesReducer";
import profileReducer from './profileReducer';
import friendsReducer from './friendsReducer';
import authReducer from './authReducer';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import appReducer from './appReducer';
import chatReducer from "./chatReducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: mesaggesReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// type PropetiesTypes<T> = T extends {[keys: string]: infer U} ? U : never
// export type InferActionsType<T extends {[keys: string]: (...args: any[])=>any}> = ReturnType<PropetiesTypes<T>>
export type InferActionsType<T> = T extends {[keys: string]: (...args: any[])=> infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//мб какое-то дерьмо добавил!!!
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>; 

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

// let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export default store