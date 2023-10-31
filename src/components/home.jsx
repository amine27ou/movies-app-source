import React,{useEffect, useState} from 'react'
import {AiFillHeart} from 'react-icons/ai'
import {CiCircleRemove} from 'react-icons/ci'
import ImgSlider from "./imgSlider"
import {Link} from "react-router-dom"
import Footer from './footer'

export default function Home(props) {
    const {movies} = props
    const [favorite,setFavorite] = useState([])
    function handleFav(movie){
      const newFavList = [...favorite,movie]
      setFavorite(newFavList)
      localStorage.setItem('movie-app-fav',JSON.stringify(newFavList))
      window.alert("Added to favorite list")
    }
    function handleRemove(movie){
      const newFavList = favorite.filter(fav=>{return fav.imdbID !== movie.imdbID})
      setFavorite(newFavList)
    }
    useEffect(()=>{
      const moviesFavLocalSt = JSON.parse(localStorage.getItem('movie-app-fav'))
      setFavorite(moviesFavLocalSt)
    },[])
  return (
    <>
    <div>
      {movies.length === 0 && <ImgSlider/>}
    </div>
    {movies.length > 0 && <h1 style={{color:"white",margin:"20px"}}>Movies List:</h1>}
    <div className="movies-slider">
      <div className="movies-container">
        {movies ? movies.map((movie, index) => (
          <div className="movie" key={index}>
           <div className="img-container">
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt="movie" />
        </Link>
            <div className="layer" onClick={()=>{handleFav(movie)}}>
                <p>Add to Favorite </p>
                <AiFillHeart className='heart-icon' />
            </div>
           </div>
          </div>
        )) : <h1 style={{color:"white",margin:"20px"}}>there is no result</h1>}

      </div>
      <div className="favorite-movies">
        <div className="title">
          {favorite.length > 0 && <h1 style={{color:"white",margin:"20px"}}>Favorite</h1>}
          <div className="movies-container">
            { favorite.map((movie,index)=>{
              
              return(<div className="movie" key={index}>
              <div className="img-container">
                <Link to={`/movie/${movie.imdbID}`}>
               <img src={movie.Poster} alt="movie" />
              </Link>
               <div className="layer" onClick={()=>{handleRemove(movie)}}>
                   <p>Remove from favorite </p>
                   <CiCircleRemove className='remove-icon' />
               </div>
              </div>
             </div>
            )})}
          </div>
        </div>
      </div>
    </div>
              <Footer/>
    </>
  )
}
