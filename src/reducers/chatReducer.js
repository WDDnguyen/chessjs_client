const chatReducer = (chat = {message: '', messageLog: []}, action) => {
    switch (action.type) {
        case 'SET_CHAT_MESSAGE':
            return {
                ...chat,
                message: action.message
            }
        case 'RESET_CHAT_MESSAGE':
            return {
                ...chat,
                message: ''
            }
        case 'ADD_MESSAGE':
            const updatedMessageLog = chat.messageLog.concat(action.message)
            return {
                ...chat,
                messageLog: updatedMessageLog 
            }
        default:
            return chat
    }
}

export const setChatMessage = message => {
    return {
        type: 'SET_CHAT_MESSAGE',
        message: message
    }
}

export const resetChatMessage = () => {
    return {
        type: 'RESET_CHAT_MESSAGE'
    }
}

export const addMessageToLog = message => {
    return {
        type: 'ADD_MESSAGE',
        message: message
    }
}

export default chatReducer
