import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        marginBottom: '0.5em',
    },
    title: {
        textAlign: 'start',
    },
});

export interface ContentWrapper {
    title: string;
    children: React.ReactElement;
}

export default function ContentWrapper({
    title,
    children,
}: ContentWrapper) {
    const classes = useStyles();

    return (
        <Grid
            container
            alignItems='center'
            className={classes.root}
        >
            <Grid
                item
                xs={12}
                sm={2}
            >
                <Typography
                    variant='subtitle1'
                    className={classes.title}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={10}
            >
                {children}
            </Grid>
        </Grid>
    );
}
