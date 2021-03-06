const lobbyReducer = (lobby = {rooms: [], joinedRoom: false, newRoomInfo: {roomName: '', roomOwner: 'anonymous', side: 'white'}}, action) => {
    switch (action.type) {
        case 'SET_NEW_ROOM_PLAYER_SIDE':
            return {
                ...lobby,
                newRoomInfo: {
                    ...lobby.newRoomInfo,
                    side: action.side
                }
            }
        case 'SET_NEW_ROOM_NAME':
            return {
                ...lobby,
                newRoomInfo: {
                    ...lobby.newRoomInfo,
                    roomName: action.roomName
                }
            }
        case 'SET_NEW_ROOM_OWNER':
            return {
                ...lobby,
                newRoomInfo: {
                    ...lobby.newRoomInfo,
                    roomOwner: action.roomOwner
                }
            }
        case 'SET_JOINED_ROOM':
            return {
                ...lobby,
                joinedRoom: true
            }
        case 'RESET_JOINED_ROOM' :
            return {
                ...lobby,
                joinedRoom: false
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

export const setNewRoomName = roomName => {
    return {
        type: 'SET_NEW_ROOM_NAME',
        roomName: roomName
    }
}

export const setNewRoomOwner = roomOwner => {
    return {
        type: 'SET_NEW_ROOM_OWNER',
        roomOwner: roomOwner
    }
}

export const setJoinedRoom = () => {
    return { 
        type: 'SET_JOINED_ROOM',
    }
}

export const resetJoinedRoom = () => {
    return { 
        type: 'RESET_JOINED_ROOM',
    }
}

export const setAvailableRooms = availableRooms => {
    return {
        type: 'SET_AVAILABLE_ROOMS',
        availableRooms: availableRooms
    }
}

export default lobbyReducer
