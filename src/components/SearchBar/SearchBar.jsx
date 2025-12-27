import React, { useState } from "react";
import "./SearchBar.css";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const API_KEY = "adb9cf0b03495d242aac6ebafa25af41";
  const searchMovie = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setMovie(null);
        return;
      }
      const movieData = data.results[0];
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=${API_KEY}`
      );
      const credits = await creditsRes.json();
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`
      );
      const videos = await videoRes.json();
      const trailer = videos.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      const providerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/watch/providers?api_key=${API_KEY}`
      );
      const providerData = await providerRes.json();
      const providers = providerData.results?.IN?.flatrate || [];
      const ottPlatforms =
        providers.map((p) => p.provider_name).join(", ") || "Not available";
      setMovie({
        title: movieData.title,
        overview: movieData.overview,
        poster: movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : null,
        hero: credits.cast[0]?.name || "N/A",
        heroine: credits.cast[1]?.name || "N/A",
        ott: ottPlatforms,
        trailer: trailer
          ? `https://www.youtube.com/watch?v=${trailer.key}`
          : null,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="searchbar-wrap">
      <div className="search-row">
        <input
          type="text"
          value={query}
          placeholder="Search movie..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovie}>🔍</button>
      </div>
      {movie && (
        <div className="movie-results">
          <div className="movie-details">
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="poster-img" />
            )}
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p><strong className="blue">Hero:</strong> {movie.hero}</p>
              <p><strong className="blue">Heroine:</strong> {movie.heroine}</p>
              <p><strong className="blue">Overview:</strong> {movie.overview}</p>
              <p><strong className="blue">OTT Platform:</strong> {movie.ott}</p>
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noreferrer"
                  className="trailer-link"
                >
                  ▶ <span className="blue">Watch Trailer</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;