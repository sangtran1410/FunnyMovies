import React from 'react'
import axios from 'axios'
import { ConfigRoute } from '../api'

export const useAxios = ({ headers } = {}) => {
  // const token = useLocalStorage('tokenVid')

  return axios.create({
    baseURL: ConfigRoute || '',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      ...headers
    },
  })
}

export function useLocalStorage(key) {
  const [storage, setStorage] = React.useState(window.localStorage[key])

  function setLocalStorage (event) {
    if (event.key === key) {
      setStorage(event.newValue)
    }
  }

  React.useEffect(() => {
    window.addEventListener('storage', setLocalStorage)
    return () => {
      window.removeEventListener('storage', setLocalStorage)
    }
  }, [])

  return storage
}
