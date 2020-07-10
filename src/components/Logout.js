import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../store/actions/auth'


const Logout = ()=>{
    const dispatch = useDispatch()
    return(
        <div className="text-center">
            <p>Вы зашли в профиль! Теперь вы можете добавлять и редактировать товары!</p>
            <button className="btn btn-outline-warning"
                onClick={()=>{dispatch(logout())}}
            >
                Выйти из профиля
            </button>
        </div>
    )
}

export default Logout;