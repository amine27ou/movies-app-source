import React, { useState ,useEffect} from 'react'
import imgData from '../imgData'
import {FaChevronLeft} from "react-icons/fa6"
import {FaChevronRight} from "react-icons/fa6"

export default function ImgSlider() {
  const [posters,setPosters] = useState(imgData)
  const [index,setIndex] = useState(0)
    function nextSlide(){
      setIndex(prevState=>{
        if(prevState === posters.length - 1){
          return 0
        }else{
          return prevState + 1
        }
      })
    }
    function prevSlide(){
      setIndex(prevState=>{
        if(prevState === 0){
          return posters.length - 1
        }else{
          return prevState - 1
        }
      })
    }
    useEffect(() => {
      const interval = setInterval(nextSlide, 10000);
    }, []);
    const {Poster,Title,Year} = imgData[index]
  return (
    <div>
      <div className="img-slider-container">
        <img src={Poster} alt="" />
        <div className="img-slider-layer">
          <div className="movie-slider-info">
            <h1>{Title}</h1>
            <p>{Year}</p>
          </div>
        <FaChevronLeft onClick={prevSlide} className='left'/>
        <FaChevronRight onClick={nextSlide} className='right'/>
        </div>
      </div>
    </div>
  )
}
