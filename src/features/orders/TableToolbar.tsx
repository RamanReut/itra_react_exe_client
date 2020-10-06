import React from 'react'
import Grid from '@material-ui/core/Grid'
import { MTableToolbar } from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import ColumnVisibility from './ColumnVisibility'

const useStyles = makeStyles({
    labelWrapper: {
        minWidth: '9em',
    },
});

export default function TableToolbar(props: any) {
    const classes = useStyles();

    return (
        <Grid 
            container
            alignItems='center'
        >
            <Grid 
                item
                className={classes.labelWrapper}
            >
                <MTableToolbar {...props}></MTableToolbar>
            </Grid>
            <Grid item>
                <ColumnVisibility></ColumnVisibility>
            </Grid>
        </Grid>
    );
}
