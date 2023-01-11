import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addResponse } from '../../redux/actions'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import db from "../../db.json"

import s from "./style.module.css"

const Form = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errors = useSelector(state => state.errors)
  const [values, setValues] = useState({})

  const onSubmit = e => {
    e.preventDefault()
    let valid = true

    for (const prop in values) {
      if (!values[prop] || values[prop] === "") {
        valid = false
      }
    }

    if (valid) dispatch(addResponse(values))

    setValues({})

    for (const el of e.target.elements) {
      el.type === "checkbox" ? el.checked = false : el.value = ""
    }

    if (!errors.addResponse) {
      Swal.fire({
        title: 'Reponse sent successfully',
        icon: "success",
        iconColor: "#139397",
        showCloseButton: true,
        confirmButtonText: "See responses",
        allowEnterKey: false,
        customClass: {
          popup: `${s.alert}`,
          closeButton: `${s.closeButton}`,
          confirmButton: `${s.confirmButton}`,
          denyButton: `${s.denyButton}`,
        }
      })
        .then(result => {
          if (result.isConfirmed) navigate("responses")
        })
    }

  }

  const changeHandler = e => {

    setValues(curr => {

      if (e.target.type === "checkbox") {
        return {
          ...curr,
          [e.target.name]: { checked: e.target.checked }
        }
      }

      return {
        ...curr,
        [e.target.name]: e.target.value
      }

    })

  }


  return (
    <div>

      <h1 className={`${s.title}`}>¡Super Challenge Greydive Form!</h1>

      <form onSubmit={onSubmit} className={`${s.form}`}>

        {db ?

          db.items.map(field => {
            return (
              <div key={field.name} className={field.type === "checkbox" ? `${s.checkboxDiv} ${s.divInput}` : `${s.divInput}`} >
                {field.type !== "submit" ? <label className={`${s.label}`} key={field.label} htmlFor={field.name}>{field.label}: </label> : null}

                {
                  field.type !== "select" ?
                    <input className={field.type === "submit" ? `${s.submit} ${s.input}` : `${s.input}`} key={field.name} type={field.type} name={field.name} required onChange={changeHandler} />

                    :

                    <select key={field.name} name={field.name} onChange={changeHandler}>
                      {
                        field.options.map(option => {
                          return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          )
                        })
                      }
                    </select>
                }

              </div>
            )
          })

          : null}
      </form>

    </div>
  )
}

export default Form