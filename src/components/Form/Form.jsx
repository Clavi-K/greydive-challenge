import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addResponse } from '../../redux/actions'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import db from "../../db.json"

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
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "See responses",
        allowEnterKey: false,
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
      <form onSubmit={onSubmit}>

        {db ?

          db.items.map(field => {
            return (
              <div key={field.name} className="input" >
                {field.type !== "submit" ? <label key={field.label} htmlFor={field.name}>{field.label}: </label> : null}

                {
                  field.type !== "select" ?
                    <input key={field.name} type={field.type} name={field.name} required onChange={changeHandler} />

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