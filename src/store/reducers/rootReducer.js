import {combineReducers} from 'redux'
import authReducer from './auth'
import catalogReducer from './catalog'

export default combineReducers({
    auth: authReducer,
    catalog: catalogReducer
})