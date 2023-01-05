const initialState = {
    responses: []
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case "GET_RESPONSES":
            return {
                ...state,
                responses: action.payload
            }

        default:
            return state

    }

}