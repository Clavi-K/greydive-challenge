import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResponses } from '../../redux/actions'

import s from "./style.module.css"

const Container = () => {

    const dispatch = useDispatch()
    const responses = useSelector(state => state.responses)


    useEffect(() => {
        dispatch(getResponses())
    }, [])

    return (
        <>

            <h1 className={`${s.title}`}>Total responses: </h1>

            <div className={`${s.reponsesContainer}`}>
                {
                    responses.length ?

                        responses.map(r => {
                            return (
                                <div className={`${s.response}`}>

                                    {r.data.map(prop => {

                                        return (
                                            <div className={`${s.field}`}>
                                                {<p>{prop.label}:</p>}
                                                <p className={`${s.value}`}>{prop.label !== "Terms and conditions" ? prop.value : prop.value.checked.toString()}</p>
                                            </div>
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

