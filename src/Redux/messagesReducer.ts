import { DialogsType, MessagesType } from "../types/types";
import { InferActionsType } from "./redux-store";

let initialState = {
    messages: [
        {name: "Manuk", id: 1},
        {name: "Vasya", id: 2},
        {name: "Kucher", id: 3},
        {name: "Leshich", id: 4},
        {name: "Tema", id: 5},
    ] as Array<MessagesType>,

    dialogs: [
        {id: 1, message: "Привет"},
        {id: 2, message: "Мб соберемся?"},
        {id: 3, message: "Манук вроде даже будет"},
    ] as Array<DialogsType>
}

export type InitialStateType = typeof initialState

const mesaggesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        
        case 'glot/messages/ADD-MESSAGE': {
            let newMessage = {
                id: 6,
                message: action.newMessageText,
            };
            return {
                ...state,
                dialogs: [...state.dialogs, newMessage],
            };
        }

        default:
            return state;
    }
}

type ActionsType = InferActionsType<typeof actions>

export const actions = {
    addMessage: (newMessageText: string) => ({ 
        type: 'glot/messages/ADD-MESSAGE',
        newMessageText }) as const  
}

export default mesaggesReducer