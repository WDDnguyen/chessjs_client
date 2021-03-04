const selectSquareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HIGHLIGHT':
            return action.highlightSquares
        case 'HIGHLIGHT_RESET':
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
        type: 'HIGHLIGHT_RESET'
    }
}

export default selectSquareReducer
