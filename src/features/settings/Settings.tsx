import React from 'react'
import Language from './Language'
import Theme from './Theme'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '1em',
    }
});

export default function Settings() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Language></Language>
            <Theme></Theme>
        </Paper>
    );
}
