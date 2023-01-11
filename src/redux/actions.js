import firebase from "../firebase"
import { collection, addDoc, onSnapshot } from "firebase/firestore"

export const ERROR = "ERROR"
export const PUSH_RESPONSE = "PUSH_RESPONSE"

export function addResponse(response) {

    return async (dispatch) => {

        try {
            await addDoc(collection(firebase, "responses"), response)

        } catch (e) {
            dispatch({ type: ERROR, payload: { source: "addResponse", message: e.message || e } })
        }

    }

}

export function getResponses() {

    return async (dispatch) => {

        try {

            const unsub = onSnapshot(collection(firebase, "responses"), snap => {
                snap.docs.map(d => {
                    dispatch({ type: PUSH_RESPONSE, payload: responseFormat({ id: d.id, ...d.data() }) })
                })

            })


        } catch (e) {
            console.log(e)
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