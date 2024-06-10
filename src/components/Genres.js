import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    genreMessage: {
        marginTop: '25px',
        paddingLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '20%',
        },
    },

    box: {
        width: '380px',
        borderRadius: '15px',
        background: `rgba(255, 255, 255, 0.8)`,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width: '90%',
        },
    },
}));

const Genres = ({ genres, genre, setGenre }) => {
    const classes = useStyles();

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    return (
        <Box className={classes.box}>
            <FormControl className={classes.formControl}>
                <InputLabel id="genre-dialog">Select a Genre</InputLabel>
                <Select
                    labelId="genre-dialog"
                    value={genre}
                    onChange={handleChange}
                >
                    {genres.map((genre, index) => (
                        <MenuItem
                            key={index}
                            value={genre.list_name_encoded}
                        >
                            {genre.display_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Genres;
