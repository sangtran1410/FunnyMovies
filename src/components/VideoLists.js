import React from 'react'
import { EndPoint } from '../api'
import { useAxios } from '../services'
import Like from '../icons/like.jpg'
import disLike from '../icons/dislike.jpg'

export default function VideoLists() {
  const [videoList, setVideoList] = React.useState([])
  const axios = useAxios()

  React.useEffect(
    function () {
      ;(async function () {
        const { data } = await axios.get(EndPoint.videoList)
        
        setVideoList(data)
      })()
    },[]
  )

  return (
    <div className="video-list-page">
      <div className="list-videos">
        {videoList && videoList.map && videoList.map((item, key) => (
          <div key={key} className="video-items">
            <div className="video-content">
              <iframe
                title={key}
                src={item.url}
                allowFullScreen="allowfullscreen">
              </iframe>
            </div>
            <div className="video-info">
              <h4>{item.title || '--'}</h4>
              <div>Share by: {item.email || '--'}</div>
        
              <div className="emotion">
                <b>{item.like || 0}</b><img src={Like} height='18' alt="Like" />
                <b>{item.dislike || 0}</b><img src={disLike} height='18' alt="disLike" />
              </div>
              <div>Description:</div>
              <div>{item.description || '--'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}