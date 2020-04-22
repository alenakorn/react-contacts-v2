import {CLOSE_SUCCESS_MESSAGE, CREATE_SUCCESS, SUBMIT_CREATE_FORM} from '../action/types'

const initialState = {
    loading: false,
    isFinished: false,
    contacts: []
}

export default function create(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_CREATE_FORM:
            return {
                ...state,
                contacts: action.contacts
            }
        case CREATE_SUCCESS:
            return {
                ...state,
                isFinished: true
            }
        case CLOSE_SUCCESS_MESSAGE:
            return {
                ...state,
                isFinished: false
            }
        default :
            return state;
    }

}
