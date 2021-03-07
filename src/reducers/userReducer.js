const userReducer = (user = {userName: 'anonymous', userId: undefined}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user
        default:
            return user
    }
}

export const setUser = user => {
    return {
        type: 'SET_USER',
        user: user
    }
}

export default userReducer
