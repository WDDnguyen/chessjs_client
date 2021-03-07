const chessReducer = (updateChess = {fen: 'start', turn: 'w', history: undefined, potentialMoves: {}}, action) => {
    switch (action.type) {
        case 'UPDATE_CHESS_STATUS':
            return action.chessStatus
        default:
            return updateChess
    }
}

export const updateChessStatus = chessStatus => {
    return {
        type: 'UPDATE_CHESS_STATUS',
        chessStatus: chessStatus
    }
}

export default chessReducer
