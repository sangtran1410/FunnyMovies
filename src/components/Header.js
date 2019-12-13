import React from 'react';
import Home from '../icons/home.jpg'
import { AuthContext } from './AuthProvider'
import { useAxios } from '../services'
import { isEmail } from '../services/help'
import { navigate } from "@reach/router"
import { EndPoint } from '../api'


function Header () {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })

  const context = React.useContext(AuthContext)
  const axios = useAxios()

  function onChangeInput(e, type) {
    e.persist()
    setUser(preState => ({
      ...preState,
      [type]: e.target.value,
    }))
  }

  function validate(isRegister = false) {
    const err = []
    for (var key in user) {
      if (!user[key].trim()) {
        err.push(key)
      }
    }
    
    if (err.length > 0) {
      alert(`Please input ${err.join(', ')} to ${isRegister ? 'register' : 'login'} !`)
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

  async function checkAccount() {
    if (validate(true)) {
      const { data } = await axios.get(EndPoint.user)

      if (data) {
        let userObj = data.filter((item) => (item.email === user.email))
        userObj = userObj[0]

        if (userObj && userObj.email === user.email) {
          alert('Your account is exist !')
        } else {
          onRegister()
        }
      } else {
        onRegister()
      }
    }
  }

  function onRegister() {
    axios.post(EndPoint.user, user)
    .then((res) => {
      if (res && (res.staus === 200 || res.status === 201)) {
        alert('Register success, you can login now !')        
      }
    })
    .catch((err) => {
      alert('Some thing went wrong !')      
    })
    .finally(() => {
      setUser({
        email: '',
        password: '',
      })
    })
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
            <input type="text" value={user.email} onChange={e => onChangeInput(e, 'email')} placeholder="Email"></input>
            <input type="password" value={user.password} onChange={e => onChangeInput(e, 'password')} placeholder="Password"></input>
            <button onClick={onLogin}>Login</button>
            <button className="dark" onClick={checkAccount}>Register</button>
          </>
        }
      </div>
    </div>
  )
}

export default Header;