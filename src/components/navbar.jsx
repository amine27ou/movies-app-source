import React,{useEffect, useState} from 'react'
import {Link,Outlet} from "react-router-dom"
import {LuPopcorn} from "react-icons/lu"
import {AiOutlineSearch} from "react-icons/ai"
import {HiOutlineSave} from 'react-icons/hi'
export default function Navbar(props){
    const [query,setQuery] = useState('')
    const [moviesTitle,setMoviesTitle] = useState([])


    function handleInput(e){
        setQuery(e.target.value)
    }
    function handleSub(e){
        e.preventDefault()
        props.getData(query)
        setQuery(' ')
    }
    async function getTitles(){
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=54072aaa`)
        const responseJson = await response.json()
        if (responseJson.Search) {
            const titles = responseJson.Search.map(item => item.Title);
            setMoviesTitle(titles);
        } else {
            setMoviesTitle([]);
        }    } 
        const displayItem = query ? moviesTitle.filter(item => item.toLowerCase().includes(query.toLowerCase())) : null;
        useEffect(()=>{
        getTitles()
    },[query])
    const [hamburger,setHamburger] = useState(false)
    return(
        <>
        <div className={`hamburger-layer ${hamburger && 'active'}`}></div>
        <div className='navbar'>
            <div className="logo">
                <LuPopcorn className='logo-icon' />
                <Link to="/">Movies2Watch</Link>
            </div>
            <div className={`input-wrapper ${hamburger && 'active'}`}>
                <Link to='/watchlist'><HiOutlineSave/>Watchlist</Link>
                    <input type="text" value={query} onChange={handleInput} />
                    <button onClick={handleSub} className='search-btn'><AiOutlineSearch/>Search</button>
                <div className={displayItem && 'result' }>
                    {displayItem ? displayItem.map((item, index) => (
                            <div key={index}>-{item}</div>
                        )):null}</div>

            </div>
            <div onClick={()=>{setHamburger(!hamburger)}} className={`hamburger ${hamburger && 'active' }`}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
        <Outlet/>
        </>
    )
}   