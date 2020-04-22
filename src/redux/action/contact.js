import axios from '../../axios/axios'
import {OPEN_CONTACT_SUCCESS} from './types'

export function openContact(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`/contacts/${id}.json`)
            dispatch(openContactSuccess(response.data, id))
        } catch (e) {
            console.log(e)
        }
    }
}

export function openContactSuccess(contactItem, id) {
    return {
        type: OPEN_CONTACT_SUCCESS,
        contactItem,
        id
    }
}


export function deleteContact(id) {
    return async dispatch => {
        try {
            const response = await axios.delete(`/contacts/${id}.json`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}