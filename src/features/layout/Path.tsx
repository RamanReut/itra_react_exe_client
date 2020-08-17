import React, { ReactElement } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStylesPath = makeStyles((theme: Theme) => ({
    li: {
        color: theme.palette.primary.contrastText
    }, 
    separator: {
        color: theme.palette.grey[500],
    },
}));

export default function Path() {
    const classes = useStylesPath();

    return (
        <Breadcrumbs 
            classes={classes}
            maxItems={4}
        >
            {createPathPoints(['main', 'data'])}
        </Breadcrumbs>
    );
}

function createPathPoints(points: string[]): ReactElement[] {
    return points.map((elem: string, key: number) => {
        return <Link color="inherit" key={elem}>{elem}</Link>
    });
}