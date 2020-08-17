import React, { ChangeEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import MenuOpen from '@material-ui/icons/MenuOpen'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import { types } from './reducer'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Path from './Path'
import Hidden from '@material-ui/core/Hidden'

const useStylesHiddenButton = makeStyles((theme: Theme) => ({
    iconWrapper: {
        color: theme.palette.primary.contrastText
    }
}));

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
}));

interface HideButtonProps {
    state: types.NavbarPosition,
    onClick?: () => void,
}

function HideButton({ state, onClick}: HideButtonProps) {
    const classes = useStylesHiddenButton();
    let Icon: any;

    switch(state) {
        case 'hide':
            Icon = Menu;
            break;
        case 'open':
            Icon = MenuOpen;
            break;
    }

    return (
        <IconButton 
            color='secondary'
            className={classes.iconWrapper}
            onClick={onClick}
        >
            <Icon></Icon>
        </IconButton>
    );
}

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
        <AppBar>
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
                        alignItems='center'
                        spacing={3}
                    >
                        <Grid item>
                            <HideButton 
                                state={navbarPosition}
                                onClick={onNavbarButtonClick}
                            ></HideButton>
                        </Grid>
                        <Grid item>
                            <Hidden xsDown>
                                <Path></Path>
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
                                    variant='filled'
                                    type='search'
                                    color='primary'
                                    label='Search'
                                    value={searchText}
                                    onChange={onSearchTextChange}
                                ></TextField> 
                        </Grid>
                        <Grid item>
                            <Avatar></Avatar>                  
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}