import React from 'react'
import { types } from './reducer'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ExpandIcon from '@material-ui/icons/NavigateNext'
import CollapseIcon from '@material-ui/icons/NavigateBefore'

const useStyles = makeStyles((theme: Theme) => ({
    color: {
        color: theme.palette.background.default,
    },
}));

export interface MenuButtonProps {
    state: types.NavbarPosition,
    onClick?: () => void,
}

export default function MenuButton({ state, onClick = () => {} }: MenuButtonProps) {
    const classes = useStyles();
    let Icon: any;

    switch (state) {
        case 'hide':
            Icon = ExpandIcon;
            break;
        case 'open':
            Icon = CollapseIcon;
            break;
    }

    return (
        <IconButton 
            data-testid='header-menuButton'
            onClick={onClick}
            className={classes.color}
        >
            <Icon data-testid={`header-menuButton-icon`}></Icon>
        </IconButton>
    );
}