import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arraw_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}=useParams();

  const navigate=useNavigate();
  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:"",
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjVhZjU0YTA3NmNmYzFkZWQ2MWIwMTUzNmRmODU5NCIsIm5iZiI6MTc0NTY4MjAzMS4zNTY5OTk5LCJzdWIiOiI2ODBjZmU2ZjNjNzE4ZThjNTUzN2FhYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0xo7owmJBaajNZ7aY70S40OP-zJwR4paMm-DzUZ59js'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arraw_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe title='trailer' src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player