import React, { useContext, useEffect } from 'react'
import axios, { post } from 'axios'
import { MainContext } from '../../context/main/MainState'

function CreateItem() {
  const {
    state: { tempItem },
    dispatch,
  } = useContext(MainContext)

  // controlled input elements
  function changeDescription(e) {
    tempItem.name = e.target.value
    dispatch({ type: 'ONCHANGE_DESC', payload: tempItem })
  }

  function changeComment(e) {
    tempItem.greeting = e.target.value
    dispatch({ type: 'ONCHANGE_COMMENT', payload: tempItem })
  }

  function changeFile(e) {
    tempItem.file = e.target.files[0]
    dispatch({ type: 'ONCHANGE_FILE', payload: tempItem })
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR_ITEM' })
  }, [dispatch])

  // data handling
  function onSubmit(e) {
    e.preventDefault()
    console.log()
    // send form data to server 'create' route
    const url = 'http://localhost:4000/upload'
    const formData = new FormData()
    let formNames = ['upload', 'name', 'greeting']
    let nameTarget = [tempItem.file, tempItem.name, tempItem.greeting]
    for (let i = 0; i < formNames.length; i++) {
      formData.append(formNames[i], nameTarget[i])
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    post(url, formData, config).then((res) => {
      console.log(res.data)
      dispatch({ type: 'SET_ALL_ITEMS', payload: res.data })
    })

    dispatch({ type: 'CLEAR_ITEM' })
  }

  function runNameAPI() {
    console.log('hi')
    axios.get('http://localhost:4000/mern3/api/greetings/').then((res) => {
      alert(JSON.stringify(res.data))
    })
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3 style={{ textAlign: 'center' }}>Create New User</h3>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name: </label>
          <input
            type='text'
            name='name'
            className='form-control'
            value={tempItem.name}
            onChange={changeDescription}
          />
        </div>

        <div className='form-group'>
          <label>Greeting: </label>
          <input
            type='text'
            name='greeting'
            className='form-control'
            value={tempItem.greeting}
            onChange={changeComment}
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
          <br />
          <input type='file' name='upload' onChange={changeFile} />
        </div>
        <br />

        <button type='button' onClick={() => runNameAPI()}>
          Call Name API
        </button>
      </form>
    </div>
  )
}

export default CreateItem

// END of document
