import {combineReducers} from 'redux';
import create from './reducer/create'
import commentListReducer from './reducer/list'
import contact from './reducer/contact'

export default combineReducers({
    create: create,
    list: commentListReducer,
    contact: contact
})