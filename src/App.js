import { useState, useEffect } from 'react';
import bookService from './services/books';

import Genres from './components/Genres';
import Datepicker from './components/Datepicker';
import Bestseller from './components/Bestseller';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
}));

const background = {
    backgroundImage: `url(${
        process.env.PUBLIC_URL + 'img/background-img.jpg'
    })`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100%',
    opacity: '0.8',
};

function App() {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const hook = () => {
        bookService.getGenres().then((genres) => {
            const maintainedGenres = genres.results.filter(
                (genre) =>
                    new Date(genre.newest_published_date) > new Date() - 30
            );

            setGenres(maintainedGenres);
        });
    };

    useEffect(hook, []);
    return (
        <div style={background}>
            <CssBaseline>
                <Container className={classes.container}>
                    <Genres
                        genres={genres}
                        setGenre={setGenre}
                        genre={genre}
                    />
                    <Datepicker
                        genre={genre}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        genres={genres}
                    />
                    <Bestseller genre={genre} date={selectedDate} />
                </Container>
            </CssBaseline>
        </div>
    );
}

export default App;
