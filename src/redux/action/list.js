import axios from '../../axios/axios'
import {FETCH_CONTACT_SUCCESS, EMPTY_CONTACT_LIST} from './types'

export function fetchContacts() {
    return async dispatch => {
        try {
            const response = await axios.get('/contacts.json')
            const keys = Object.keys(response.data)
            const values = Object.values(response.data)
            const data = values.map((val, key) => ({...val, id: keys[key]}))

            dispatch(fetchContactsSuccess(data))
        } catch (e) {
            dispatch({type: EMPTY_CONTACT_LIST})
        }
    }
}

export function fetchContactsSuccess(contacts) {
    return {
        type: FETCH_CONTACT_SUCCESS,
        contacts
    }
}