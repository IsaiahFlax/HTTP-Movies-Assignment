import React, {useState, useEffect} from 'react'
import axios from 'axios'

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

function UpdateMovie(props) {
    const [movie, setMovie] = useState(initialItem)
    const [star, setStar] = useState('')

    useEffect(() => {
        const selectedMovie = props.movieList.find(movie => {
            return `${movie.id}` === props.match.params.id
        })
        if (selectedMovie) {
            setMovie(selectedMovie)
        }
        console.log('update movie', props.match.params.title)
    }, [props.movieList, props.match.params.title, props]);

//     const changeHandler = mv => {
//         mv.persist()
//         let value = mv.target.value;
    

//     setMovie({
//         ...movie,
//         [mv.target.name]: value
//     })
// }
const changeHandler = e => {
    e.persist()
    setMovie({...movie, [e.target.name]: e.target.value})
}

const handleSubmit = e => {
    e.preventDefault()
    axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
             props.setMovieList(res.data);
             console.log('sent data', res.data)
        }).catch(err => {
            console.log(err);
        })
        props.getMovieList()
        props.history.push(`/`)
    
}
const handleNewStar = ev => {
    ev.preventDefault()
    setMovie({ ...movie, stars: [...movie.stars, star]})
    setStar('')
  }

return (
    <div>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder='title'
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder='director'
                value={movie.director}
            />
            <input
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder='metascore'
                value={movie.metascore}
            />
                <input
                type="text"
                name="stars"
                onChange={handleNewStar}
                placeholder='stars'
                value={movie.stars}
            />
            <div className='baseline' />

            <button type='submit' className='update-button'>Save Changes</button>
        </form>
    </div>
)
}
export default UpdateMovie