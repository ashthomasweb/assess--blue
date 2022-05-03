import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainState from '../src/context/main/MainState'
import NavHeader from './components/nav-header/nav-header.component'
import ItemsList from './components/items-list/items-list.component'
import CreateItem from './components/create-item/create-item.component'

function App() {
  return (
    <MainState >
      <NavHeader />
      <br />
      <CreateItem/>
      <br />
      <ItemsList />
    </MainState>
  )
}

export default App

// END of document
