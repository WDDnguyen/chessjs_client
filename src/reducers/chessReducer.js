const chessReducer = (state = 'start', action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.fen
        default:
            return state
    }
}

export const updateFen = fen => {
    return {
        type: 'UPDATE',
        fen: fen
    }
}

export default chessReducer
