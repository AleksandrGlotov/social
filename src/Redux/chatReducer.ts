import { ChatMessageType } from "../components/Chat/ChatPage";
import { BaseThunkType, InferActionsType } from "./redux-store";
import { chatAPI, StatusType } from './../api/chat-api';
import { Dispatch } from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'glot/chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages].filter((m, index, array) => index >= array.length - 100)
            }
        }

        case 'glot/chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case 'glot/chat/RESET_MESSAGES': {
            return {
                ...state,
                messages: []
            }
        }

        default:
            return state;
    }
}

//Action Creators

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ 
        type: 'glot/chat/MESSAGES_RECEIVED', 
        payload: {messages}
    }) as const,
    statusChanged: (status: StatusType) => ({
        type: 'glot/chat/STATUS_CHANGED',
        payload: {status}
    }) as const,
    resetMessages: () => ({type: 'glot/chat/RESET_MESSAGES'}) as const
}

//Thunk

type ThunkType = BaseThunkType<ActionsTypes>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(actions.resetMessages())
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
};

export default chatReducer