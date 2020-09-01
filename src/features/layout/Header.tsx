import React, { ChangeEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Path from './Path'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import { HEADER_HEIGHT } from './constants'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchInput from './SearchInput'

const useHeaderStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '0 1em',
        height: `${HEADER_HEIGHT}vh`
    },
    blockWrapper: {
        margin: '0.5em 0',
    },
    path: {
        paddingLeft: '0.5em'
    }, 
    menuButton: {
        color: theme.palette.primary.main,
    },
    searchInputWrapper: {
        [theme.breakpoints.up('sm')]: {
            width: '20em',
        },
    }
}));

export interface HeaderProps {
    onNavbarButtonClick: () => void;
    searchText: string;
    onSearchTextChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export default function Header({
    onNavbarButtonClick,
    searchText,
    onSearchTextChange,
}: HeaderProps) {
    const classes = useHeaderStyles();

    return (
        <AppBar 
            data-testid='header'
            position='sticky'
            color='default'
        >
            <Grid 
                className={classes.root}
                container
                justify='space-between'
                wrap='nowrap'
                alignItems='center'
            >
                <Grid 
                    className={classes.blockWrapper}
                    item
                >
                    <Grid 
                        container
                        item
                        alignItems='center'
                        spacing={0}
                    >
                        <Grid item>
                            <Hidden smUp>
                                <IconButton
                                    onClick={onNavbarButtonClick}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon></MenuIcon>
                                </IconButton>  
                            </Hidden>           
                        </Grid>
                        <Grid item>
                            <Hidden xsDown>
                                <Box className={classes.path}>
                                    <Path></Path>
                                </Box>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    className={classes.blockWrapper}
                >
                    <Grid 
                        container
                        alignItems='center'
                        spacing={3}
                        wrap='nowrap'
                    >
                        <Grid 
                            item
                            className={classes.searchInputWrapper}
                        >
                            <SearchInput 
                                text={searchText}
                                onChange={onSearchTextChange}
                            ></SearchInput>         
                        </Grid>
                        <Grid item>
                            <Avatar data-testid='header-avatar'></Avatar>                  
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}
