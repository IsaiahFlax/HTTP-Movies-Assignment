import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  
      if (movies.length === undefined) {
        return (
        'Loading Movies...'
        )
      }
      {console.log('movies.length', movies.length)

          return(  
        <div className="movie-list">    
        {console.log('movies', movies)}  
        
        {movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
          }
      
    </div>
  );
        
}
}




export default MovieList;
