import { useContext, useEffect } from 'react'
import axios from 'axios'
import { MainContext } from '../context/main/MainState'

// from items-list
export function useAxiosOnLoad() {
  const { dispatch } = useContext(MainContext)
  useEffect(() => {
    axios.get('http://localhost:4000/mern3/').then((response) => {
        dispatch({ type: 'SET_ALL_ITEMS', payload: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [dispatch])
}

// END of document
