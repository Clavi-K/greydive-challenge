import { ERROR, GET_RESPONSES } from "./actions"

const initialState = {
    responses: undefined,
    errors: {}
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_RESPONSES:
            return {
                ...state,
                responses: action.payload
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