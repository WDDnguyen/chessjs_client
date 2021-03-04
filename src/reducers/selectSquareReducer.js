const selectSquareReducer = (state = null, action) => {
    switch (action.type) {
        case 'SELECT':
            return action.square
        case 'SELECT_RESET':
            return null
        default:
            return state
    }
}

export const setSelectSquare = square => {
    return {
        type: 'SELECT',
        square: square
    }
}

export const resetSelectedSquare = () => {
    return {
        type: 'SELECT_RESET'
    }
}

export default selectSquareReducer
