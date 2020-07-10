import C from "../actionsTypes"

const initialState = {
    token: null,
    sending: false,
    errorMessage: null
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case C.SET_SENDING:
            return{
                ...state, sending: true, errorMessage: null
            }
        case C.AUTH_SUCCESS:
            return{
                token: action.token, sending: false, errorMessage: null
            }
        case C.AUTH_ERROR:
            return{
                ...state, sending: false, errorMessage: action.errMess
            }
        case C.LOGOUT:
            return{
                ...state, token: null
            }
        default:
            return state
    }
}