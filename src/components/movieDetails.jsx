import React,{useEffect, useState} from 'react';
import { useParams ,Link} from 'react-router-dom';
import {MdAddToPhotos} from "react-icons/md"
import Footer from './footer'

export default function MovieDetails(props) {
  const [movieDetail,setMovieDetail] = useState([])
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  async function fetchMovie(){
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=54072aaa`)
    const movieRes = await response.json()
    setMovieDetail(movieRes)
    setLoading(false)
  }
  useEffect(()=>{
    fetchMovie()
  },[])
  
  
  return (
    <div className='movie-detail'>
      {loading ? <h1 style={{textAlign:'center',color:"white"}}>...Loading</h1> : <>
      <Link className='back-link' to='/'>&lt;  Back to home page</Link>
        <div className="first-row">
          <div>
          <h1>{movieDetail.Title}</h1>
          <p style={{color:'#006494'}}>{movieDetail.Year}</p>
          </div>
          <div className="rating">
            {Array.isArray(movieDetail.Ratings) && movieDetail.Ratings.map(rate=>{
              return(
                <div className='websites-rating'>
                  <h3>{rate.Source}</h3>
                  <p style={{color:'#006494'}}>{rate.Value}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="second-row">
          <img src={movieDetail.Poster} alt="" />
          <div>
          <p>Rated: <span>{movieDetail.Rated} </span></p>
          <p>Released: <span>{movieDetail.Released} </span></p>
          <p>Runtime: <span>{movieDetail.Runtime} </span></p>
          <p>Genre: <span>{movieDetail.Genre} </span></p>
          <p>Director: <span>{movieDetail.Director} </span></p>
          <p>Writer: <span>{movieDetail.Writer} </span></p>
          <p>Actors: <span>{movieDetail.Actors} </span></p>
          <p>Plot: <span>{movieDetail.Plot}</span></p>
          <p>Language: <span>{movieDetail.Language}</span></p>
          <p>Country: <span>{movieDetail.Country}</span></p>
          <p>Awards: <span>{movieDetail.Awards}</span></p>
          </div>
        </div>
        <div className="third-row">
          <div className='add-watchlist-btn' onClick={()=>{props.addToWatchList(movieDetail)}}><MdAddToPhotos className='add-watchlist' />Add to Watchlist</div>
        </div>
        </>}
    </div>
  );
}
