import { ERROR, PUSH_RESPONSE } from "./actions"

const initialState = {
    responses: [],
    errors: {}
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case PUSH_RESPONSE:
            return {
                ...state,
                responses: state.responses.filter(r => r.id === action.payload.id).length === 0 ? [...state.responses || [], action.payload] : [...state.responses || []]
            }

        case ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.source]: action.payload.message
                }
            }

        default:
            return state

    }

}