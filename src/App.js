import React, {useState} from 'react';
import {makeStyles, Typography, Button, TextField, FormLabel} from "@material-ui/core";
import movieListJson from './movies.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '900px',
      margin: '20px auto'
  },
    form: {
      border: '5px solid black',
        position: 'relative',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    formTitle: {
      position: 'absolute',
        top: -15,
        backgroundColor: 'white',
        padding: '0 5px'
    }
})



function App() {
    const classes = useStyles();
    const [keyword, setKeyword] = useState(null);
    const [movieList, setMovieList] = useState(null);
    const [displaySearchedMovieList, setDisplaySearchedMovieList] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setDisplaySearchedMovieList(true);
        keywordSearch();
    }

    const keywordSearch = () => {
        let movies = [];
        for (let key in movieListJson) {
            if (movieListJson.hasOwnProperty(key)) {
                if(movieListJson[key].name.toLowerCase().search(keyword.toLowerCase()) !== -1) {
                    movieListJson[key].key = key;
                    movies.push(movieListJson[key]);
                }
            }
        }
        setMovieList(movies);
    }

    const displaySearchResults = () => {
        return (
            movieList.map(row => (
                <div key={row.key}><span style={{fontWeight: 'bold'}}>{row.name}</span> ({row.year})</div>
            ))
        )
    }

    const displayAllMovies = () => {
        let movies = [];
        for (let key in movieListJson) {
            if (movieListJson.hasOwnProperty(key)) {
                movies.push(movieListJson[key]);
            }
        }
        return (
            movies.map(row => (
                <div key={row.key}><span style={{fontWeight: 'bold'}}>{row.name}</span> ({row.year})</div>
            ))
        )
    }

    return (
    <div className={classes.root}>
        <form className={classes.form}>
            <div className={classes.formTitle}>Keyword Search</div>
            <TextField label={'Keyword'} onChange={e => setKeyword(e.target.value)}/>
            <Button type={'submit'} variant={'contained'} color={'primary'} onClick={handleSubmit}>Submit</Button>
        </form>
        <div>
            {displaySearchedMovieList ? displaySearchResults() : displayAllMovies() }
        </div>
    </div>
    );
}

export default App;
