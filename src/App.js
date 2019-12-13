import React from 'react';
import Permission from './components/Permission'
import { Router } from "@reach/router"
import VideoLists from './components/VideoLists'
import ShareMovies from './components/ShareMovies'
import Header from './components/Header'
import AuthProvider from './components/AuthProvider'
import './App.scss';

function App () {
  return (
    <div className="page">
      <AuthProvider>
        <Header />
        <Router>
          <Permission
            path='/'
            yes={VideoLists}
            // token={null}
          />
          <Permission
            path='/share-movies'
            yes={ShareMovies}
            // token={token}
          />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
