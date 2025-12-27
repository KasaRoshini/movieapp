import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import "../../assets/cards/Cards.css"
import { Link } from "react-router-dom";
const TitleCards = ({title,category}) => {
  const [movies,setMovies]=useState([]);
  const cardsRef= useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGI5Y2YwYjAzNDk1ZDI0MmFhYzZlYmFmYTI1YWY0MSIsIm5iZiI6MTc1NjMwNjg2Ni43OTcsInN1YiI6IjY4YWYxZGIyOGE1ZjIzNjk0ZGZhOTJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mnFAlJCBFsdAjkmdJs8UyhvqtoEMAsWi6G555jvYWjE",
    },
  };
  useEffect(()=>{
    const fetchMovies = async () => {
      try{
        const url =`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`;
        const res=await fetch(url,options);
        const data = await res.json();
        setMovies(data.results || []);
      }catch(err) {
        console.error("Error fetching movies:",err);
      }
    };
    fetchMovies();
  },[category]);
  const handleWheel =(e)=>{
    if(cardsRef.current){
      cardsRef.current.scrollLeft += e.deltaY;
    }
  };
  return (
    <div className="TitleCards">
      <h2>{title || "Popular on Film Finder"}</h2>
      <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
        {movies.map((movie) => (
          <Link to={`/player/${movie.id}`} className="card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title || movie.original_title}
            />
            <p>{movie.title || movie.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default TitleCards;
