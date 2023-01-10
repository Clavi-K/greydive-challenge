import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResponses } from '../../redux/actions'
const Container = () => {

    const dispatch = useDispatch()
    const responses = useSelector(state => state.responses)


    useEffect(() => {
        dispatch(getResponses())
    }, [])

    return (
        <>
            <div className="reponsesContainer">
                {
                    responses.length ?

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

