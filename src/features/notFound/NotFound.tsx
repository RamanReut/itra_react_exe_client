import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%',
        color: theme.palette.text.primary,
    },
}));

export default function NotFound() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid 
            container
            className={classes.root}
            justify='space-around'
            alignItems='center'
        >
            <Grid item>
                404 {t('pageNotFound')}
            </Grid>
        </Grid>
    );
}
