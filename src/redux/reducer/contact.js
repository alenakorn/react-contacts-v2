import {OPEN_CONTACT_SUCCESS} from '../action/types'

const initialState = {
    loading: false,
    contactItem: {},
    id: '',
    openModal: false,
}

export default function contact(state = initialState, action) {
    switch (action.type) {
        case OPEN_CONTACT_SUCCESS:
            return {
                ...state, loading: false, contactItem: action.contactItem, id: action.id, openModal: true
            }
        default :
            return state;
    }

}
