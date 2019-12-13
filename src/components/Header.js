import React from 'react';
import Home from '../icons/home.jpg'
import { AuthContext } from './AuthProvider'
import { isEmail } from '../services/help'
import { navigate } from "@reach/router"


function Header () {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })

  const context = React.useContext(AuthContext)

  function onChangeInput(e, type) {
    e.persist()
    setUser(preState => ({
      ...preState,
      [type]: e.target.value,
    }))
  }

  function validate() {
    const err = []
    for (var key in user) {
      if (!user[key].trim()) {
        err.push(key)
      }
    }
    
    if (err.length > 0) {
      alert(`${err.join(', ')} is required !`)
      return false
    }

    if (!isEmail(user.email)) {
      return window.alert('Please input email correctly !')
    }

    return true
  }

  function onLogin() {
    if (validate()) {
      context.login(user)
    }
  }

  return (
    <div className="app-header">
      <div className="left-header">
        <img src={Home} height='60' alt="Home" />
        <span className="title">Funny videos</span>
      </div>
      <div className="right-header">
        {context.accessToken &&
          <>
            <span>Welcome <b>{context.accessToken.split('&')[0]}</b></span>
            <button onClick={() => navigate('/share-movies')}>Share a movie</button>
            <button onClick={context.logout}>Logout</button>
          </>
        }
        {!context.accessToken &&
          <>
            <input type="text" onChange={e => onChangeInput(e, 'email')} placeholder="Email"></input>
            <input type="password" onChange={e => onChangeInput(e, 'password')} placeholder="Password"></input>
            <button onClick={onLogin}>Login</button>
            <button className="dark" onClick={onLogin}>Register</button>
          </>
        }

      </div>
    </div>
  )
}

export default Header;