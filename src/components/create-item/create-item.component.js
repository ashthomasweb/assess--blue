import React, { useContext, useEffect } from 'react'
import axios, { post } from 'axios'
import { MainContext } from '../../context/main/MainState'

function CreateItem() {
  const {
    state: { tempItem },
    dispatch,
  } = useContext(MainContext)

  // controlled input elements
  function changeName(e) {
    tempItem.name = e.target.value
    dispatch({ type: 'ONCHANGE_NAME', payload: tempItem })
  }

  function changeGreeting(e) {
    tempItem.greeting = e.target.value
    dispatch({ type: 'ONCHANGE_GREETING', payload: tempItem })
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
      dispatch({ type: 'SET_ALL_ITEMS', payload: res.data })
    })
  }

  function runNameAPI() {
    console.log('hi')
    axios.get('http://localhost:4000/mern3/api/greetings/').then((res) => {
      alert(JSON.stringify(res.data))
    })
  }

  function setNameAPI() {
    console.log('hi')
    let name = tempItem.name
    let greeting = tempItem.greeting
    axios.get(`http://localhost:4000/mern3/api/setUser/${name}/${greeting}`).then((res) => {
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
            onChange={changeName}
          />
        </div>

        <div className='form-group'>
          <label>Greeting: </label>
          <input
            type='text'
            name='greeting'
            className='form-control'
            value={tempItem.greeting}
            onChange={changeGreeting}
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
            />
          <input type='file' style={{margin: '0 0 0 10px'}} name='upload' onChange={changeFile} />
            <p>Use blue button and above fields to set an image, name, and greeting.</p>
        </div>
        <hr/>

        <p><strong>Use buttons below to call the API routes directly. Use above fields for input.</strong></p>
        <p>Call the API to get my name. It retrieves the first in the list, so please don't delete the entry.</p>
        <p>Route: 'http://localhost:4000/mern3/api/greetings/</p>

        <button type='button' onClick={() => runNameAPI()}>
          Call Name via API
        </button>
        <br />
        <hr/>
        <br />
        <p>Call the API to set a name and optional greeting. Requires refresh.</p>
        <p>Route: 'http://localhost:4000/mern3/api/setUser/USER-NAME-HERE/OPTIONAL-GREETING</p>

        <button type='button' onClick={() => setNameAPI()}>
          Set Name via API
        </button>
      </form>
    </div>
  )
}

export default CreateItem

// END of document
