import React from 'react'
import List from '@material-ui/core/List'
import Item from './NavbarItem'
import { types } from './reducer'
import HomeIcon from '@material-ui/icons/Home'
import DataIcon from '@material-ui/icons/Storage'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import * as constants from './constants'
import classnames from 'classnames'
import Box from '@material-ui/core/Box'

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        overflow: 'hidden',
        transition: `width ${theme.transitions.duration.standard}ms`,
        width: `${constants.NAVBAR_MIN_WIDTH + 1 + 5}em`,

    },
    collapse: {
        width: `${constants.NAVBAR_ICON_SIZE + 0.3}em`,
    },
    list: {
        position: 'fixed',
        top: '56px',
    }
}));

export interface NavbarListProps {
    position?: types.NavbarPosition,
}

export default function NavbarList({ position = 'open'}: NavbarListProps) {
    const classes = useStyles();

    return (
        <Box className={classnames(classes.root, { [classes.collapse]: position === 'hide' })}>
            <Box className={classes.list}>
            <List
                component='nav'
            >
                <Item
                    icon={<HomeIcon></HomeIcon>}
                    text='Home'
                    to='/'
                ></Item>
                <Item
                    icon={<DataIcon></DataIcon>}
                    text='Data'
                    to='/data'
                ></Item>
                <Item
                    icon={<SettingsIcon></SettingsIcon>}
                    text='Settings'
                    to='/settings'
                ></Item>
            </List>
            </Box>
            <Box></Box>
        </Box>
    );
}

