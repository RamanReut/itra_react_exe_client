import React from 'react'
import Box from '@material-ui/core/Box'
import HeaderContainer from './HeaderContainer'
import Grid from '@material-ui/core/Grid'
import Navbar from './NavbarContainer'
import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        overflowX: 'hidden',
    },
    childrenWrapper: {
        width: '100%',
    },
    navbarWrapper: {
        backgroundColor: fade(theme.palette.common.black, 0.1),        
    },
    fullHeight: {
       minHeight: '95vh'
    }
}));

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
                className={classes.fullHeight}
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