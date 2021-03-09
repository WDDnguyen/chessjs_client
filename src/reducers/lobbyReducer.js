const lobbyReducer = (lobby = {rooms: [], roomJoined: null, newRoomInfo: {side: 'white'}}, action) => {
    switch (action.type) {
        case 'SET_NEW_ROOM_PLAYER_SIDE':
            return {
                ...lobby,
                newRoomInfo: {
                    ...lobby.newRoomInfo,
                    side: action.side
                }
            }
        case 'SET_ROOM_JOINED':
            return {
                ...lobby,
                joinedRoom: action.joinedRoom
            }
        case 'RESET_ROOM_JOINED' :
            return {
                ...lobby,
                joinedRoom: null
            }
        case 'SET_AVAILABLE_ROOMS':
            return {
                ...lobby,
                rooms: action.availableRooms
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

export const setRoomJoined = joinedRoom => {
    return {
        type: 'SET_ROOM_JOINED',
        joinedRoom: joinedRoom
    }
}

export const resetRoomJoined = () => {
    return {
        type: 'RESET_ROOM_JOINED',
    }
}

export const setAvailableRooms = availableRooms => {
    return {
        type: 'SET_AVAILABLE_ROOMS',
        availableRooms: availableRooms
    }
}

export default lobbyReducer
