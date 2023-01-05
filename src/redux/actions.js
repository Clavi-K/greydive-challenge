import firebaseDb from "../firebase"

const ref = firebaseDb.collection("responses")

export function addResponse(response) {

    return async (dispatch) => {

        try {

            await ref.doc().set(response)

        } catch(e) {
            console.log(e)
        }

    }

}