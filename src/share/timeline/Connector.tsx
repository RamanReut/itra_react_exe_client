import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Color } from './types'
import { colorPicker } from './colorPicker'

interface StyleProps {
    color: Color;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderLeftColor: ({ color }: StyleProps) => colorPicker(theme, color),
        borderLeftWidth: '2px',
        borderLeftStyle: 'solid',
        height: '1em',
        marginLeft: 'calc(1rem + 1px)',
    },
}));

export interface ConnectorProps {
    color: Color,
}

export default function Connector({ color }: ConnectorProps) {
    const classes = useStyles({ color });

    return (
        <Box className={classes.root}></Box>
    );
}
