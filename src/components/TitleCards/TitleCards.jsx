import React, { useEffect,useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'
// import { Link } from 'react-router-dom';

const TitleCards = ({title,catagory}) => {

  const [apiData, setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjVhZjU0YTA3NmNmYzFkZWQ2MWIwMTUzNmRmODU5NCIsIm5iZiI6MTc0NTY4MjAzMS4zNTY5OTk5LCJzdWIiOiI2ODBjZmU2ZjNjNzE4ZThjNTUzN2FhYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0xo7owmJBaajNZ7aY70S40OP-zJwR4paMm-DzUZ59js'
    }
  };


const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${catagory?catagory:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[])


  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="cards-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
             return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
               <p>{card.original_title}</p>
             </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards