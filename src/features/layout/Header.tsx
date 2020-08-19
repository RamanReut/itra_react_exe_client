import React, { ChangeEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import { types } from './reducer'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Path from './Path'
import Hidden from '@material-ui/core/Hidden'
import MenuButton from './MenuButton'
import Box from '@material-ui/core/Box'

const useHeaderStyles = makeStyles((theme: Theme) => ({
    input: {
        backgroundColor: fade(theme.palette.common.white, 0.55),
        '& :focus': {
            backgroundColor: fade(theme.palette.common.white, 0.3),
        },
    },
    blockWrapper: {
        margin: '0 0.5em',
    },
    path: {
        paddingLeft: '0.5em'
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
        >
            <Grid 
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
                            <MenuButton 
                                state={navbarPosition}
                                onClick={onNavbarButtonClick}
                            ></MenuButton>
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
                                data-testid='header-searchInput'
                                className={classes.input}
                                variant='filled'
                                type='search'
                                color='primary'
                                label='Search'
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