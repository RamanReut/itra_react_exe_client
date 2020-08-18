import React, { ReactElement, useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/ListItemIcon'
import Text from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import DataIcon from '@material-ui/icons/Storage'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import classnames from 'classnames'
import { types } from './reducer'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import { Link } from 'react-router-dom'

const ICON_SIZE = 3;
const ITEM_PADDING = 1;
const MIN_WIDTH = ICON_SIZE + ITEM_PADDING;

const useNavbarListStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: fade(theme.palette.common.black, 0.1),
        height: '100%',
        overflow: 'hidden',
        transition: `width ${theme.transitions.duration.standard}ms`,
        width: `${MIN_WIDTH + 1 + 8}em`
    },
    collapse: {
        width: `${MIN_WIDTH}em`,
    },
}));

const useItemStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: `0.25em ${ITEM_PADDING}em`,
    },
    text: {
        marginRight: '0.5em',
        transition: 'width 0.5s',
    },
    icon: {
      width: `${ICON_SIZE}em`,
      overflow: 'hidden',
    },
}));

const useNavbarStyles = makeStyles({
    root: {
        height: '100%',
    }
})

interface NavbarProps {
    position: types.NavbarPosition,
    onClose: () => void,
}

export default function Navbar({ position, onClose }: NavbarProps) {
    const classes = useNavbarStyles();

    return (
        <Box className={classes.root}>
            <Hidden xsDown>
                <NavbarList position={position}></NavbarList>
            </Hidden>
            <Hidden smUp>
                <NavbarDrawer 
                    position={position}
                    onClose={onClose}
                ></NavbarDrawer>                
            </Hidden>
        </Box>
    );
}

function NavbarDrawer({ position, onClose }: NavbarProps) {
    useEffect(() => {
        onClose();
    }, [onClose])

    return (
        <Drawer 
            anchor='left' 
            open={position === 'open'}
            onClose={onClose}
        >
            <NavbarList></NavbarList>
        </Drawer>
    );
}

interface NavbarListProps {
    position?: types.NavbarPosition,
}

function NavbarList({ position = 'open'}: NavbarListProps) {
    const classes = useNavbarListStyles();

    return (
        <List
            className={classnames(classes.root, { [classes.collapse]: position === 'hide' })}
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
    );
}

interface ItemProps {
    icon: ReactElement,
    text: string,
    to: string
}

function Item({ icon, text, to }: ItemProps) {
    const classes = useItemStyles();

    return (
        <ListItem 
            classes={{ gutters: classes.root}}   
            button
            component={Link}
            to={to}
        >
            <Icon className={classes.icon}>
                {icon}
            </Icon>
            <Text className={classes.text}>
                {text}
            </Text>
        </ListItem>
    );
}