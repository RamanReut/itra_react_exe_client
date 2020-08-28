import React, { useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { types } from './reducer'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Drawer from './NavbarDrawer'
import List from './NavbarList'
import { CONTENT_HEIGHT } from './constants'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: `${CONTENT_HEIGHT}vh`,
        backgroundColor: theme.palette.background.default,
        position: 'sticky',
        top: '10vh',
    },
    desktopListWrapper: {
        height: 'inherit',
        margin: '0 1.5em',
        borderRadius: '0.5em',
        overflow: 'hidden',
        marginBottom: '2em',
    },
}));

interface NavbarProps {
    position: types.NavbarPosition,
    onChangePosition: () => void,
}

export default function Navbar({ position, onChangePosition }: NavbarProps) {
    const classes = useStyles();
    const handleChangePosition = 
        useCallback(() => onChangePosition(), [onChangePosition]);

    return (
        <Box className={classes.root}>
            <Hidden xsDown>
                <Box className={classes.desktopListWrapper}>
                    <List 
                        position={position}
                        onChangePosition={handleChangePosition}
                    ></List>
                </Box>
            </Hidden>
            <Hidden smUp>
                <Drawer 
                    position={position}
                    onClose={handleChangePosition}
                ></Drawer>                
            </Hidden>
        </Box>
    );
}
