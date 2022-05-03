import React, { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import { useAxiosOnLoad } from '../../utils/axios-utils'
import axios from 'axios'
import { withRoutedProps } from '../../hocs/hocs'

// individual data item component to be .map() into by parent component ItemList, defined below
const Item = (props) => {
  const { dispatch } = useContext(MainContext)
  let item = props.item

  function deleteItem() {
    let id = item._id
    axios
      .post('http://localhost:4000/mern3/delete/' + id).then((response) => {
        dispatch({ type: 'SET_ALL_ITEMS', payload: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
      dispatch({ type: 'CLEAR_ITEM' })
      props.nav('/')
  }

  return (
    <tr>
      <td>
        {props.item.file && (<img src={`data:image/jpeg;base64,${props.item.file.buffer}`} style={{width: '150px', height: 'auto'}} alt='binary img' />) }
      </td>
      <td>
        {props.item.name}
      </td>
      <td>
        {props.item.greeting}
      </td>
      <td>
        <button onClick={() => deleteItem()}>Remove</button>
      </td>
    </tr>
  )
}

function ItemsList(props) {
  // custom hook retrieves all items from database on component mount
  useAxiosOnLoad()

  const { state: { items } } = useContext(MainContext)

  function itemList() {
    return items.map((itemData, i) => <Item {...props} item={itemData} key={i} />)
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3>User List</h3>
      <table className='table table-striped' style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Greeting</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{itemList()}</tbody>
      </table>
    </div>
  )
}

export default withRoutedProps(ItemsList)

// END of document
