import React from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import {Link} from 'react-router-dom'
import Footer from './footer'

export default function Watchlist(props) {
  const {watchlist,removeWatchlist} = props

  return (
    <div className="watchlist">
          <div className="movies-container">
            { watchlist.map((movie,index)=>{
              return(
              <div className="movie" key={index}>
              <div className="img-container">
                <Link to={`/movie/${movie.imdbID}`}>
               <img src={movie.Poster} alt="movie" />
              </Link>
               <div className="layer" onClick={()=>{removeWatchlist(movie)}}>
                   <p>Remove from watchlist </p>
                   <CiCircleRemove className='remove-icon' />
               </div>
              </div>
             </div>
            )})}
          </div>
      </div>
  )
}
