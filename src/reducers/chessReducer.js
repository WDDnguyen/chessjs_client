const initialChessStatus = {
    fen: 'start',
    currentPlayer: '',
    winner: '',
    history: undefined,
    potentialMoves: {},
    isChecked: false,
    isGameOver: false
}

const chessReducer = (updateChess = initialChessStatus, action) => {
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
