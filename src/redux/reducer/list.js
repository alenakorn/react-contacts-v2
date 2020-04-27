import {EMPTY_CONTACT_LIST, FETCH_CONTACT_SUCCESS} from '../action/types'

const initialState = {
    contacts: [],
    isEmptyList: false,
    loading: true,
}

export default function commentListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state, contacts: action.contacts.reverse(), loading: false
            }
        case EMPTY_CONTACT_LIST:
            return {
                ...state, isEmptyList: true, loading: false
            }
        default :
            return state;
    }
}
