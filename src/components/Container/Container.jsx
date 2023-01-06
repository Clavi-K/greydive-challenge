import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResponses } from '../../redux/actions'
import { doc, onSnapshot } from "firebase/firestore"
import db from "../../firebase"

const Container = () => {

    const dispatch = useDispatch()
    const responses = useSelector(state => state.responses)
    const errors = useSelector(state => state.errors)

    useEffect(() => {
        if (!responses) dispatch(getResponses())
    }, [dispatch])

    return (
        <>
            <div className="reponsesContainer">
                {
                    responses ?

                        responses.map(r => {
                            return (
                                <div className="response">

                                    {r.data.map(prop => {

                                        return (
                                            prop.label !== "Terms and conditions" ? <p>{prop.label}: {prop.value}</p> : <p>{prop.label}: {prop.value.checked.toString()}</p>
                                        )

                                    })}

                                </div>
                            )
                        })

                        : null
                }
            </div>
        </>
    )
}

export default Container

