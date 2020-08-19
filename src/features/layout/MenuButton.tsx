import React from 'react'
import { types } from './reducer'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import MenuOpen from '@material-ui/icons/MenuOpen'

const useStylesHiddenButton = makeStyles((theme: Theme) => ({
    iconWrapper: {
        color: theme.palette.primary.contrastText
    }
}));

export interface MenuButtonProps {
    state: types.NavbarPosition,
    onClick?: () => void,
}

export default function MenuButton({ state, onClick = () => {} }: MenuButtonProps) {
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
            data-testid='header-menuButton'
            color='secondary'
            className={classes.iconWrapper}
            onClick={onClick}
        >
            <Icon data-testid={`header-menuButton-icon`}></Icon>
        </IconButton>
    );
}