import { useState, useEffect } from 'react';
import bookService from '../services/books';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    box: {
        width: '380px',
        marginTop: '20px',
        borderRadius: '15px',
        background: `rgba(255, 255, 255, 0.8)`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width: '90%',
        },
    },
    root: {
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px',
        borderRadius: '15px',
        boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
    media: {
        height: 140,
    },
    spinnerContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px',
    },
}));

const Bestseller = ({ genre, date }) => {
    const classes = useStyles();
    const [bestseller, setBestseller] = useState({
        title: '',
        author: '',
        bookImage: '',
        description: '',
        url: '',
    });
    const hook = () => {
        if (genre !== '' && date !== null) {
            bookService
                .getCurrentBestseller(genre, date)
                .then((bestseller) => {
                    const newBestSellerObject = {
                        title: bestseller.results.books[0].title,
                        author: bestseller.results.books[0].author,
                        bookImage: bestseller.results.books[0].book_image,
                        description:
                            bestseller.results.books[0].description,
                        url:
                            bestseller.results.books[0].amazon_product_url,
                    };
                    setBestseller(newBestSellerObject);
                });
        }
    };
    useEffect(hook, [genre, date]);

    if (genre !== '' && date !== null) {
        return (
            <Box className={classes.box}>
                <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ marginBottom: '10px' }}
                >
                    the New York Times #1 bestseller in the {genre} genre
                    on {date} was
                </Typography>
                <Card className={classes.root}>
                    <CardActionArea>
                        {bestseller.bookImage ? (
                            <CardMedia
                                className={classes.media}
                                image={bestseller.bookImage}
                                title={bestseller.title}
                            />
                        ) : (
                            <Box className={classes.box}>
                                <CircularProgress />
                            </Box>
                        )}

                        <CardContent>
                            <Typography
                                style={{ marginBottom: '0' }}
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                {bestseller.title}
                            </Typography>
                            <Typography
                                variant="blockline"
                                display="block"
                                gutterBottom
                            >
                                BY {bestseller.author}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {bestseller.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            target="_blank"
                        >
                            Share
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            href={bestseller.url}
                            target="_blank"
                        >
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        );
    } else {
        return null;
    }
};

export default Bestseller;
