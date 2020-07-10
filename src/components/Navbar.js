import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = ({isAuth})=>{
    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <NavLink to ="/" className="navbar-brand">Test-task</NavLink>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink exact to ="/" className="nav-link">Каталог</NavLink>
                </li>
                {
                    isAuth?
                    <li className="nav-item">
                        <NavLink to ="/add" className="nav-link">Добавить</NavLink>
                    </li>
                    :null
                }
                <li className="nav-item">
                    <NavLink to ="/auth" className="nav-link">{isAuth?'Профиль':'Авторизация'}</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;