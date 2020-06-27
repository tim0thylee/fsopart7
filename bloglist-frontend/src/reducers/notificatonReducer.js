/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION': 
            return action.data
        case 'DELETE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        data: notification
    }
}

export const deleteNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION'
    }
}

export default reducer