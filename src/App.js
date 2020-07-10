import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Add from './pages/Add';
import Auth from './pages/Auth';
import Edit from './pages/Edit';
import Navbar from './components/Navbar';
import { autoLogin } from './store/actions/auth';

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(autoLogin())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const {isAuth} = useSelector(state => {
        return{
            isAuth: !!state.auth.token,
        }
    })

    return (
        <BrowserRouter>
            <Navbar isAuth={isAuth}/>
            <div className="container p-5">
                <Switch>
                    <Route path="/" exact component={Catalog}/>
                    <Route path="/auth" component={Auth}/>
                    {isAuth&&<Route path="/edit/:id" component={Edit}/>}
                    {isAuth&&<Route path="/add" component={Add}/>}
                    <Redirect to='/' />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
