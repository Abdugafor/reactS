import React, { useEffect, useState }  from "react";
import { starWars, uniqueNamesGenerator } from "unique-names-generator";

export function Test() {
  const randomName = () => uniqueNamesGenerator({dictionaries: [starWars], length: 1})

  const [state, setState] = useState({
    name: randomName(),
    editMode: false,
    button: 'own'
  })
  const [status, setStatus] = useState('')

  const changeName = () => setState((prev) => ({...prev, name: randomName()}))

  const changeEditMode = () => setState((prev) => ({...prev, editMode: !state.editMode}))

  const changeStatus = (e) => {
    setStatus(e.currentTarget.value)
  }
  
  useEffect(() => {
    if (state.editMode) {
      setState((prev) => ({...prev, button: 'ok'}))
    setStatus(state.name)

    }else {
      setState((prev) => ({...prev, button: 'own'}))
    }

  }, [state.editMode, state.name])

  useEffect(() => {
    setState((prev) => ({...prev, name: status}))

  }, [state.button, status])

  return (
    <>
      <h1>{state.name}</h1>
      <button onClick={changeName}>Random</button>
      <button onClick={changeEditMode}>{state.button}</button>

      {state.editMode &&
        <input type="text" onChange={changeStatus} value={status}/>
      }
    </>
  )
}