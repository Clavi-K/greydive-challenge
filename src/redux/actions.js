import db from "../firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"

export const GET_RESPONSES = "GET_RESPONSES"
export const ERROR = "ERROR"


export function addResponse(response) {

    return async (dispatch) => {

        try {
            await addDoc(collection(db, "responses"), response)

        } catch (e) {
            dispatch({ type: ERROR, payload: { source: "addResponse", message: e.message || e } })
        }

    }

}

export function getResponses() {

    return async (dispatch) => {

        try {
            const payload = []
            const queryResponse = await getDocs(collection(db, "responses"))

            queryResponse.forEach(doc => {
                payload.push(responseFormat({
                    id: doc.id,
                    ...doc.data()
                }))
            })

            dispatch({ type: GET_RESPONSES, payload })

        } catch (e) {
            dispatch({ type: ERROR, payload: { source: "getResponses", message: e.message || e } })
        }

    }

}

function responseFormat(response) {
    const result = { id: response.id, data: [] }

    for (const prop in response) {

        if (prop !== "id") {
            const capitalized = prop.charAt(0).toUpperCase() + prop.slice(1)

            result.data.push({
                label: capitalized.replace(/_/g, " "),
                value: response[prop]
            })
        }

    }

    return result

}