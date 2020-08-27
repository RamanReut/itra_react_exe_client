import React, { ReactElement } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SeparatorIcon from '@material-ui/icons/NavigateNext'

const useStylesPath = makeStyles((theme: Theme) => ({
    ol: {
        '& li:last-child': {
            color: theme.palette.primary.main,
        }
    },
    li: {
        color: theme.palette.primary.light,
    }, 
    separator: {
        color: theme.palette.grey[500],
    },
}));

export default function Path() {
    const classes = useStylesPath();

    return (
        <Breadcrumbs 
            data-testid='header-path'
            classes={classes}
            maxItems={4}
            separator={<SeparatorIcon fontSize='small'></SeparatorIcon>}
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