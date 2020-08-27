import React from 'react'
import Box from '@material-ui/core/Box'
import HeaderContainer from './HeaderContainer'
import Grid from '@material-ui/core/Grid'
import Navbar from './NavbarContainer'
import { makeStyles } from '@material-ui/core/styles'
import { HEADER_HEIGHT } from './constants'

const useStyles = makeStyles({
    root: {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
    },
    childrenWrapper: {
        width: '100%',
    },
    navbarWrapper: {
        height: '100%',
    },
    contentHeight: {
        minHeight: `${100 - HEADER_HEIGHT}vh`,
    }
});

interface LayoutProps {
    children?: JSX.Element,
}

export default function Layout({ children }: LayoutProps) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <HeaderContainer></HeaderContainer>
            <Grid 
                container
                justify='flex-start'
                wrap='nowrap'
                className={classes.contentHeight}
            >
                <Grid 
                    item
                    className={classes.navbarWrapper}
                >
                    <Navbar></Navbar>
                </Grid>
                <Grid 
                    item
                    className={classes.childrenWrapper}
                >
                    {children}
                </Grid>
            </Grid> 
        </Box>
    );
}