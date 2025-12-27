import React, { useState } from "react";
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import hero_banner from '../../assets/hero--banner.jpg';
import play_icon from '../../assets/pay--icon.jpg';
import info_icon from '../../assets/info1--icon.jpg';
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from '../../components/Footer/Footer.jsx';
const Home = () => {
  const [movies, setMovies] = useState([]);
  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_TMDB_API_KEY`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <div className="home">
      <Navbar />
      {movies.length > 0 && (
        <div className="search-results">
          {movies.map((movie) => (
            <div key={movie.id} className="search-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      )}
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <p>
            Movie Description:<br/>
            Cinema is a matter of what's in the frame and what's out the reality is. <br />
            If you want a happy ending, that depends of course, on where you stop your story...
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="" /> Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Film Finder"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks For You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
