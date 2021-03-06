const lobbyReducer = (lobby = {rooms: [], newRoom: {roomName: '', roomOwner: '', side: 'white'}}, action) => {
    switch (action.type) {
        case 'SET_NEW_ROOM_PLAYER_SIDE':
            return {
                ...lobby,
                newRoom: {
                    ...lobby.newRoom,
                    side: action.side
                }
            }
        case 'SET_NEW_ROOM_NAME':
            return {
                ...lobby,
                newRoom: {
                    ...lobby.newRoom,
                    roomName: action.roomName
                }
            }
        case 'SET_NEW_ROOM_OWNER':
            return {
                ...lobby,
                newRoom: {
                    ...lobby.newRoom,
                    roomOwner: action.roomOwner
                }
            }
        default:
            return lobby
    }
}

export const setNewRoomPlayerSide = side => {
    return {
        type: 'SET_NEW_ROOM_PLAYER_SIDE',
        side: side
    }
}

export const setNewRoomName = roomName => {
    return {
        type: 'SET_NEW_ROOM_NAME',
        roomName: roomName
    }
}

export const setNewRoomOwner = owner => {
    return {
        type: 'SET_NEW_ROOM_OWNER',
        roomOwner: owner
    }
}

export default lobbyReducer
