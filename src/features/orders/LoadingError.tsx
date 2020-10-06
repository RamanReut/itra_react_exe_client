import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function LoadingError() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box>
                Ooops, cannot loading data from server. Please, reload the page.
            </Box>
        </Box>
    );
}
