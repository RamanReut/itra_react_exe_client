import React, { ReactElement } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SeparatorIcon from '@material-ui/icons/NavigateNext'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

interface MapPathPoint {
    [index: string]: string;
}

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
    const location = useLocation();
    const { t } = useTranslation('pages');

    let pathPoints = location.pathname.split('/');
    if ((pathPoints[pathPoints.length - 1]) === '') {
        pathPoints = pathPoints.slice(0, pathPoints.length - 1);
    }

    return (
        <Breadcrumbs 
            data-testid='header-path'
            classes={classes}
            maxItems={4}
            separator={<SeparatorIcon fontSize='small'></SeparatorIcon>}
        >
            {createPathPoints(pathPoints, t)}
        </Breadcrumbs>
    );
}

function createPathPoints(
    points: string[],
    t: TFunction,
): ReactElement[] {
    let curPath = '';

    return points.map((elem: string, key: number) => {
        curPath += `${elem}/`;

        return (
            <Link
                color="inherit"
                key={curPath}
                href={curPath}
            >
                {t(key === 0 ? 'main' : elem)}
            </Link>
        );
    });
}
