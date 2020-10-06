import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function NotFound() {
    const classes = useStyles();
    const { t } = useTranslation('notFound');

    return (
        <Grid 
            container
            className={classes.root}
            justify='space-around'
            alignItems='center'
        >
            <Grid item>
                404 {t('message')}
            </Grid>
        </Grid>
    );
}
