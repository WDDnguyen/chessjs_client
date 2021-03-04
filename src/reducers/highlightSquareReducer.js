const selectSquareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HIGHLIGHT':
            return action.highlightSquares
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

export default selectSquareReducer
