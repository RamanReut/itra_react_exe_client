import React, { ChangeEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import { types } from './reducer'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Path from './Path'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { HEADER_HEIGHT } from './constants'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

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
    input: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.common.white,
        }
    },
    menuButton: {
        color: theme.palette.primary.main,
    }
}));

export interface HeaderProps {
    navbarPosition: types.NavbarPosition;
    onNavbarButtonClick: () => void;
    searchText: string;
    onSearchTextChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export default function Header({
    navbarPosition,
    onNavbarButtonClick,
    searchText,
    onSearchTextChange,
}: HeaderProps) {
    const classes = useHeaderStyles();

    return (
        <AppBar 
            data-testid='header'
            position='static'
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
                            <IconButton
                                onClick={onNavbarButtonClick}
                                className={classes.menuButton}
                            >
                                <MenuIcon></MenuIcon>
                            </IconButton>             
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
                        <Grid item>
                            <TextField
                                className={classes.input}
                                data-testid='header-searchInput'
                                variant='outlined'
                                type='search'
                                color='primary'
                                size='small'
                                placeholder='Quick search...'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon></SearchIcon>
                                        </InputAdornment>                       
                                    ),
                                }}
                                value={searchText}
                                onChange={onSearchTextChange}
                            ></TextField> 
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