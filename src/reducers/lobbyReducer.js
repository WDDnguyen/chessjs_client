const lobbyReducer = (lobby = [], action) => {
    switch (action.type) {
        case 'ADD_ROOM':
            return lobby.concat(action.room)
        default:
            return lobby
    }
}

export const addRoom = room => {
    return {
        type: 'ADD_ROOM',
        room: room
    }
}

export default lobbyReducer
