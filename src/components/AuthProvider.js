import React from 'react'
import { EndPoint } from '../api'
import { useAxios, useLocalStorage } from '../services'
import { navigate } from "@reach/router"

const initialState = {
  accessToken: '',
  login () {},
  logout () {},
}

export const AuthContext = React.createContext(initialState)

export default function AuthProvider ({ children }) {
  const token = useLocalStorage('tokenVid')

  const axios = useAxios()

  const login = async ({ email, password } = {}) => {
    const { data } = await axios.get(EndPoint.getUser)

    try {
      if (data) {
        let userObj = data.filter((user) => (user.email === email))
        userObj = userObj[0]
        if (userObj && userObj.email === email && userObj.password === password) {
          alert('Login success !')
          const newToken = `${email}&${password}`
          window.localStorage.setItem('tokenVid', newToken)
          setContext(preState => ({
            ...preState,
            accessToken: newToken
          }))
        } else {
          alert('Login failed !')
        }
      }
    } catch (err) {
      alert('Some thing wrong !')      
    }
  }

  const logout = () => {
    setContext(preState => ({
      ...preState,
      accessToken: ''
    }))
    window.localStorage.clear()
    navigate('/')
  }

  React.useEffect(() => {
    if (token) {
      setContext(preState => ({
        ...preState,
        accessToken: token
      }))
    }
  },[])

  const [context, setContext] = React.useState({
    ...initialState,
    login,
    logout
  })

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}