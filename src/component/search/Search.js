import React, { useState } from 'react'
import Card from '../card/Card';
import './Search.scss'


const Search = () => {
    const [query, setQuery] = useState('');
    //create the state for movies
    const [movies, setMovies] = useState([]);
    
    
    const searchMovies = async (e) => {
        e.preventDefault();
        setQuery('');
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>
            <h3 style={{textAlign:"center", fontFamily:'cursive'}}> Movie Time</h3>
            <form className="form" onSubmit={searchMovies}>
                <input className="input" type="text" name="query"
                    placeholder="Coming to America"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit" style={{color:'white', fontSize: '24px', fontWeight:'normal'}}>Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <Card key={movie.id} movie={movie} />
                ))}
            </div>    
        </>
    )
}

export default Search
