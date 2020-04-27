import axios from '../../axios/axios'
import {
    CANCEL_EDIT,
    CLOSE_MODAL,
    EDIT_CONTACT,
    OPEN_CONTACT_SUCCESS,
    OPEN_MODAL,
    OPEN_CONFIRM_DIALOG,
    CLOSE_CONFIRM_DIALOG
} from './types'
import {fetchContacts} from './list'

export function openModalHandler() {
    return {
        type: OPEN_MODAL
    }
}

export function closeModalHandler() {
    return {
        type: CLOSE_MODAL
    }
}

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

export function openConfirmDialog() {
    return {
        type: OPEN_CONFIRM_DIALOG
    }
}

export function closeConfirmDialog() {
    return {
        type: CLOSE_CONFIRM_DIALOG
    }
}

export function deleteContact(id) {
    return async dispatch => {
        try {
            await axios.delete(`/contacts/${id}.json`)
            dispatch(fetchContacts())
            dispatch(closeConfirmDialog())
            dispatch(closeModalHandler())
        } catch (e) {
            console.log(e)
        }
    }
}

export function changeEditHandler() {
    return {
        type: EDIT_CONTACT
    }
}

export function saveEditHandler(contact, id) {
    return async(dispatch) => {
        await axios.patch(`/contacts/${id}.json`, contact)
        dispatch(cancelEditHandler());
        dispatch(fetchContacts())
    }
}

export function cancelEditHandler() {
   return {
       type: CANCEL_EDIT
   }
}