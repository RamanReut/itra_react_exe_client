import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { types } from './reducer'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Drawer from './NavbarDrawer'
import List from './NavbarList'

const useStyles = makeStyles({
    root: {
        height: '100%',
    }
})

interface NavbarProps {
    position: types.NavbarPosition,
    onClose: () => void,
}

export default function Navbar({ position, onClose }: NavbarProps) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Hidden xsDown>
                <List position={position}></List>
            </Hidden>
            <Hidden smUp>
                <Drawer 
                    position={position}
                    onClose={onClose}
                ></Drawer>                
            </Hidden>
        </Box>
    );
}
