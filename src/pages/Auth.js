import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AlertSpan from '../components/AlertSpan';
import { login } from '../store/actions/auth';
import Logout from '../components/Logout';
import Loader from '../components/Loader';

const Auth = ()=>{
    const dispatch = useDispatch()
    const {token, errorMess, sending} = useSelector(state => {
        return{
            token: state.auth.token,
            errorMess: state.auth.errorMessage,
            sending: state.auth.sending
        }
    })
    const [state, setState] = useState({
        email: {value: '', isValid: false, untouched: true},
        password: {value:'', isValid: false, untouched: true},
    })

    const handleInputChange= (e)=>{
        const value = e.target.value
        const name = e.target.name

        setState({
            ...state, 
            [name]: {
                value, 
                isValid: validateControl(value, name)
            }
        })
    }

    const validateControl = (value, type) => {
        if(type === 'email'){
            const regexE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexE.test(value)){
                return false
            }
        } else if(type==='password'){
            const regexPass = /^[\w!@#$%^&*.-]{6,128}$/;
            if(!regexPass.test(value)){
                return false
            }
        }

        return true
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        const {email, password} = state

        dispatch(login(email.value, password.value))
    }
    if(token) return (<Logout />)
    return(
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="InputEmail">E-mail (test@gmail.com)</label>
                <input 
                    type="email"
                    name="email"
                    value={state.email.value} 
                    className="form-control"
                    onChange={handleInputChange}
                />
                <AlertSpan 
                    valid={state.email.isValid} 
                    untouched={state.email.untouched}
                    message={"введите корректный e-mail"}
                />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Пароль (123456)</label>
                <input 
                    type="password"
                    name="password"
                    value={state.password.value} 
                    className="form-control"
                    onChange={handleInputChange}
                />
                <AlertSpan 
                    valid={state.password.isValid} 
                    untouched={state.password.untouched}
                    message={"введите корректный пароль (мин. 6 символов)"}
                />
            </div>
            {
                sending?<Loader />:
                <button type="submit" className="btn btn-primary" 
                    disabled={!(state.email.isValid&&state.password.isValid)}
                >
                    Вход
                </button>
            }
            <AlertSpan 
                valid={!errorMess} 
                message={errorMess}
            />
        </form>
    )
}

export default Auth;