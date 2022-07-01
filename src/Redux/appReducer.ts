import { getAuthUserData } from './authReducer';
import { InferActionsType } from './redux-store';

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'glot/app/INITIALIZED_SUCCESS': {
            return {...state, initialized: true}
        }
        
        default:
            return state;
    }
}   

//ActionCreator

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    initializedSuccess: ()  => ({ type: 'glot/app/INITIALIZED_SUCCESS'}) as const
}

//Thunk

export const initializeApp = () => {
    return (dispatch: any) => {
        let  promise = dispatch(getAuthUserData());
        Promise.all([promise]).then( () => {
            dispatch(actions.initializedSuccess());
        }) 
    }
}

export default appReducer