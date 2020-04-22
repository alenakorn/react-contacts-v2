import {FETCH_CONTACT_SUCCESS} from '../action/types'

const initialState = {
    contacts: [],
    loading: true,
}

export default function commentListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state, contacts: action.contacts.reverse(), loading: false
            }
        default :
            return state;
    }
}
