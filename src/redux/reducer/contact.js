import {
    CANCEL_EDIT, CLOSE_CONFIRM_DIALOG,
    CLOSE_MODAL,
    EDIT_CONTACT,
    OPEN_CONFIRM_DIALOG,
    OPEN_CONTACT_SUCCESS,
    OPEN_MODAL
} from '../action/types'

const initialState = {
    loading: false,
    contactItem: {},
    id: '',
    openModal: false,
    openDialog: false,
    changeEdit: false,
}

export default function contact(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state, openModal: true
            }
        case CLOSE_MODAL:
            return {
                ...state, openModal: false, id: '', contactItem: {}
            }
        case OPEN_CONTACT_SUCCESS:
            return {
                ...state, loading: false, contactItem: action.contactItem, id: action.id, openModal: true
            }
        case EDIT_CONTACT:
            return {
                ...state, changeEdit: true
            }
        case CANCEL_EDIT:
            return {
                ...state, changeEdit: false
            }
        case OPEN_CONFIRM_DIALOG:
            return {
                ...state, openDialog: true
            }
        case CLOSE_CONFIRM_DIALOG:
            return {
                ...state, openDialog: false
            }
        default :
            return state;
    }

}
