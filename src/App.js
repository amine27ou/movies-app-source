import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/movieDetails";
import Watchlist from "./components/watchlist";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [getQuery, setGetQuery] = useState("");
  async function getMoviesRequest(getQuery) {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${getQuery}&apikey=54072aaa`
    );
    const moviesData = await response.json();
    if (moviesData.Search) {
      setMovies(moviesData.Search);
    }
  }
  useEffect(() => {
    getMoviesRequest(getQuery);
  }, [getQuery]);

  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem("watchlist"))
  );
  function addToWatchList(movie) {
    if (watchlist.some((mv) => mv.imdbID === movie.imdbID)) {
      alert("Already in watchlist");
    } else {
        const newWatchlist = [...watchlist, movie];
        setWatchlist(newWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist)) 
    }
  }
  function watchlistRemove(movie) {
    const newWatchlist = watchlist.filter((mv) => mv.imdbID !== movie.imdbID);
    setWatchlist(newWatchlist);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Navbar
              getData={(getQuery) => {
                setGetQuery(getQuery);
              }}
            />
          }
        >
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="*" element={<h1>error 404</h1>} />
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                addToWatchList={addToWatchList}
                
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                removeWatchlist={watchlistRemove}
                watchlist={watchlist}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
