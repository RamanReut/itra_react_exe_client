import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function NotFound() {
    const classes = useStyles();

    return (
        <Grid 
            container
            className={classes.root}
            justify='space-around'
            alignItems='center'
        >
            <Grid item>
                404 page not found
            </Grid>
        </Grid>
    );
}
