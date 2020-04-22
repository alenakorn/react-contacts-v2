import {CLOSE_SUCCESS_MESSAGE, CREATE_SUCCESS, SUBMIT_CREATE_FORM} from './types'
import axios from '../../axios/axios'

export function createSuccess() {
    return {
        type: CREATE_SUCCESS
    }
}

export function submitContact(contacts) {
    return async(dispatch) => {
        dispatch({type: SUBMIT_CREATE_FORM, contacts});
        await axios.post('/contacts.json', contacts)
        dispatch(createSuccess())
    }
}

export function closeSuccessMessage() {
    return {
        type: CLOSE_SUCCESS_MESSAGE
    }
}