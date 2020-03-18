const initialState = {
    user: {
        user_id: null,
        username: '',
        firstName: '', 
        lastName: '', 
        email: '', 
        userPicture: ''
    }
}

const GET_USER = "GET_USER"

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_USER:
            return {...state, user: payload}
        default:
            return state
    }
}