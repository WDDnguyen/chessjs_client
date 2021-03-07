const chatReducer = (chat = {message: '', gameLog: []}, action) => {
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
        case 'UPDATE_CHAT_LOG':
            return {
                ...chat,
                gameLog: action.gameLog
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

export const updateChatLog = gameLog => {
    return {
        type: 'UPDATE_CHAT_LOG',
        gameLog: gameLog
    }
}

export default chatReducer
