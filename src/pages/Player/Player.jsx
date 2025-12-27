import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/backarrow_icon.jpg';
import { useNavigate,useParams } from 'react-router-dom';
const Player = () => {
  const {id}= useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [movie,setMovie]= useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGI5Y2YwYjAzNDk1ZDI0MmFhYzZlYmFmYTI1YWY0MSIsIm5iZiI6MTc1NjMwNjg2Ni43OTcsInN1YiI6IjY4YWYxZGIyOGE1ZjIzNjk0ZGZhOTJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mnFAlJCBFsdAjkmdJs8UyhvqtoEMAsWi6G555jvYWjE",
    },
  };
  useEffect(()=>{
    console.log("Player mounted. Movie ID:",id);
    const fetchMovieAndTrailer = async()=>{
      try{
        const detailsRes =await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options);
        const details = await detailsRes.json();
        setMovie(details);
        const videosRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options);
        const videos =await videosRes.json();
        if(videos.results && videos.results.length > 0){
          const trailer=videos.results.find(
            (vid)=>vid.type.toLowerCase() === "trailer" && vid.site === "YouTube"
          );
          const teaser=videos.results.find(
            (vid)=>vid.type.toLowerCase() === "teaser" && vid.site === "YouTube"
          );
          setVideo(trailer || teaser || videos.results[0]);
        }else{
          setVideo(null);
        }
      }catch(err){
        console.error("Error fetching trailer:",err);
      }
    };
    fetchMovieAndTrailer();
  },[id]);
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back"  className="back-btn" onClick={()=> navigate(-1)} />
      {video && video.key ? (
        <iframe width="90%" height="90%"
        src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
        title={video.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ):(
          <div className='no-trailer'>
            {movie && (
              <>
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  className="fallback-poster"
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview || "No description available."}</p>
              </>
            )}
            <p>Trailer not available</p>
          </div>
      )}
    </div>
  );
};
export default Player;