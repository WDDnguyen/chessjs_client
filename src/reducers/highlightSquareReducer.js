const selectSquareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HIGHLIGHT':
            return action.highlightSquares
        case 'RESET_HIGHLIGHT':
                return {}
        default:
            return state
    }
}

export const setHighlightSquares = squaresToHighlight => {
    return {
        type: 'HIGHLIGHT',
        highlightSquares: squaresToHighlight
    }
}

export const resetHighlightSquares = () => {
    return {
        type: 'RESET_HIGHLIGHT'
    }
}

export default selectSquareReducer
