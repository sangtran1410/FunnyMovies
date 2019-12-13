import React from 'react';
import { useAxios } from '../services'
import { isYoutubeUrl } from '../services/help'
import { EndPoint } from '../api'
import { navigate } from "@reach/router"


function ShareVideos () {
  const axios = useAxios()
  const [data, setData] = React.useState({
    title: '',
    url: '',
    description: '',
  })

  function onChangeInput(e, type) {
    e.persist()
    setData(preState => ({
      ...preState,
      [type]: e && e.target.value,
    }))
  }

  function validate() {
    const err = []
    for (var key in data) {
      if (!data[key].trim()) {
        err.push(key)
      }
    }
    
    if (err.length > 0) {
      alert(`${err.join(', ')} is required !`)
      return false
    }

    if (!isYoutubeUrl(data.url)) {
      alert(`Youtube URL is not correct !`)
      return false
    }

    return true
  }

  function submit(e) {
    e.preventDefault()
    if (validate()) {
      // replace youtube url to embed url
      data.url = data.url.replace('watch?v=', 'embed/')

      axios.post(EndPoint.videoList, data)
      .then((res) => {
        if (res && (res.staus === 200 || res.status === 201)) {
          alert('Your movie is shared !')
          navigate('/')
        }
      })
      .catch((err) => {
        console.log('err', err)
        alert('Some thing went wrong !')
      })
      .finally(() => {
        setData({
          title: '',
          url: '',
          description: '',
        })
      })
    }
  }

  return (
    <div className="share-movies-page">
      <div className="share-form">
        <form onSubmit={submit}>
          <h4>Share a Youtube movie</h4>
          <div className="line">
            <span>Title:</span>
            <input
              type="text"
              placeholder='Title'
              onChange={e => onChangeInput(e, 'title')}>
            </input>
          </div>
          <div className="line">
            <span>Youtube URL:</span>
            <input
              type="text"
              placeholder='ex: https://www.youtube.com/watch?v=12FDmPuAr4I'              
              onChange={e => onChangeInput(e, 'url')}>
            </input>
          </div>
          <div className="line">
            <span>Description: </span>
            <textarea rows='5'
              type="text"
              placeholder='Description'              
              onChange={e => onChangeInput(e, 'description')}></textarea>
          </div>
          <div><button target="blank" type="submit">Share</button></div>
        </form>
      </div>
    </div>
  )
}

export default ShareVideos;
