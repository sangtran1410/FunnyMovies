import React from 'react'
import { Redirect } from '@reach/router'
import { AuthContext } from './AuthProvider'

const whitelist = ['/']

const Permission = ({ path, yes: Component, ...props }) => {
  const context = React.useContext(AuthContext)

  const checkPermission = whitelist.indexOf(path) > -1 || context.accessToken
  return checkPermission ? <Component {...props} /> : <Redirect to='/' noThrow />
}

Permission.defaultProps = {
  yes: () => null,
}

export default Permission
