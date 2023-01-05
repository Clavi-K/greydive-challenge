import React from 'react'
import db from "../../db.json"

const Container = () => {

  const onSubmit = e => {
    console.log(e.target)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {db ?

          db.items.map(field => {
            return (
              <div className="input">
                {field.type !== "submit" ? <label htmlFor={field.name}>{field.label}</label> : null}

                {
                  field.type !== "select" ?
                    <input type={field.type} name={field.name} required />

                    :

                    <select name={field.name}>
                      {
                        field.options.map(option => {
                          return (
                            <option value={option.value}>{option.label}</option>
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

export default Container