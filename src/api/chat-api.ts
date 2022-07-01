type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscribersType = (messages: ChatMessageType[]) => void

type StatusChangedSubscribersType = (status: StatusType) => void

type EventsNamesType = 'message-received' | 'status-changed'

const subscribers = {
    'message-received': [] as MessagesReceivedSubscribersType[],
    'status-changed': [] as StatusChangedSubscribersType[]
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

let ws: WebSocket | null = null;

const closehandler = () => {
    console.log('Close websocket channel')
    notifySubscribersAboutStatus('pending')
    setTimeout(creatChannel, 3000)  
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closehandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

function creatChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closehandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        creatChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close();
    },
    subscribe(eventName: EventsNamesType,
        callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
        // @ts-ignore
            subscribers[eventName] = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType,
        callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}