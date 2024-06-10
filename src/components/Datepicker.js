import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import 'date-fns';
import { format } from 'date-fns';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    box: {
        width: '380px',
        marginTop: '20px',
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

const Datepicker = ({ genre, genres, selectedDate, setSelectedDate }) => {
    const classes = useStyles();

    const handleDateChange = (date) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        setSelectedDate(formattedDate);
    };

    if (genre !== '') {
        const genreData = genres.find(
            (genreObject) => genreObject.list_name_encoded === genre
        );

        return (
            <Box className={classes.box}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            minDate={genreData.oldest_published_date}
                            maxDate={genreData.newest_published_date}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select a Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            autoOk={true}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Box>
        );
    } else {
        return null;
    }
};

export default Datepicker;
