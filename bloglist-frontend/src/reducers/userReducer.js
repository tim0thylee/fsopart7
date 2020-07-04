/* eslint-disable linebreak-style */
/* eslint-disable indent */
const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGGED_IN':
            return action.data
        case 'LOGGED_OUT':
            return null
        default:
            return state
    }
}

export const loggedIn = (user) => {
    return {
        type: 'LOGGED_IN',
        data: user
    }
}

export const loggedOut = () => {
    return {
        type: 'LOGGED_OUT'
    }
}
export default reducer