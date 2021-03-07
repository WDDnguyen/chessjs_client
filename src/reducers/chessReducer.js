const chessReducer = (chessState = {fen: 'start', turn: 'w', history: undefined, validMove: {}, potentialMoves: {}}, action) => {
    switch (action.type) {
        case 'UPDATE_FEN':
            return {
                ...chessState,
                fen : action.fen
            }
        case 'UPDATE_TURN':
            return {
                ...chessState,
                turn : action.turn
            }
        case 'UPDATE_HISTORY':
            return {
                ...chessState,
                history : action.history
            }

        case 'SET_POTENTIAL_MOVES':
            return {
                ...chessState,
                potentialMoves: action.potentialMoves
            }
        default:
            return chessState
    }
}

export const updateFen = fen => {
    return {
        type: 'UPDATE_FEN',
        fen: fen
    }
}

export const updateTurn = turn => {
    return {
        type: 'UPDATE_TURN',
        turn: turn
    }
}

export const updateHistory = history => {
    return {
        type: 'UPDATE_HISTORY',
        history: history
    }
}

export const setPotentialMoves = potentialMoves => {
    return {
        type: 'SET_POTENTIAL_MOVES',
        potentialMoves: potentialMoves
    }
}

export default chessReducer
