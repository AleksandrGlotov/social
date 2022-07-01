import { AppStateType } from "./redux-store";

export const getMessages = (state: AppStateType) => {
    return state.messagesPage.messages;
}

export const getDialogs = (state: AppStateType) => {
    return state.messagesPage.dialogs;
}