import C from "../actionsTypes";
import axios from 'axios';

const key = 'AIzaSyBMp4F05WZa2wHN12L9kJiXZX1YI8d39HA';

export function login(email, password){
    return async dispatch => {
        dispatch(setSending())
        const loginData = {
            email, password,
            returnSecureToken: true
        }
        try{
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, loginData)
            console.log(res.data)

            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)

            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch({type: C.AUTH_SUCCESS, token: res.data.idToken})
            dispatch(autoLogout(res.data.expiresIn))
        } catch(e){
            console.log(e)
            dispatch({type:C.AUTH_ERROR, errMess: e.message})
        }
    }
}

export function setSending(){
    return {type: C.SET_SENDING}
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')

    return{type: C.LOGOUT}
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, time*1000)
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()){
                dispatch(logout())
            } else {
                dispatch({type: C.AUTH_SUCCESS, token: token})
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}