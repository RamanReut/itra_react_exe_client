import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default function TableBackdrop() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box>
                <CircularProgress></CircularProgress>
            </Box>
        </Box>
    );
}
