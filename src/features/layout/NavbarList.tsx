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
import AnalitycsIcon from '@material-ui/icons/ShowChart'
import FilterIcon from '@material-ui/icons/Filter'
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon'
import SvgIcon from '@material-ui/core/SvgIcon'
import Grid from '@material-ui/core/Grid'
import NavbarChangePosition from './NavbarChangePosition'

export const useStyles = makeStyles((theme: Theme) => ({
    onTop: {
        zIndex: 2,
    },
    root: {
        background: 
            `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
        color: theme.palette.primary.contrastText,
        height: '100%',
        overflow: 'hidden',
        transition: `width ${theme.transitions.duration.standard}ms`,
        width: `${constants.NAVBAR_MIN_WIDTH + 1 + 8}em`,
        position: 'relative',
    },
    collapse: {
        width: `${constants.NAVBAR_ICON_SIZE + 0.3 + 1}em`,
    },
    backgroundIconWrapper: {
        position: 'absolute',
        bottom: '8em',
        zIndex: 1,
        left: '12em',
        transform: 'scale(13)'
    },
    backgroundIcon: {
        color: fade(theme.palette.common.black, 0.3),  
    },
    fullHeight: {
        height: '100%',
    }
}));

export interface NavbarListProps {
    position?: types.NavbarPosition;
    onChangePosition: () => void;
}

export default function NavbarList({ 
    position = 'open', 
    onChangePosition
}: NavbarListProps) {
    const classes = useStyles();

    return (
        <Box className={classnames(classes.root, { [classes.collapse]: position === 'hide' })}>
            <Grid 
                className={classes.fullHeight}
                container
                direction='column'
                justify='space-between'
            >
                <Grid item>
                    <List
                        className={classes.onTop}
                        component='nav'
                    >
                        <Item
                            icon={<HomeIcon></HomeIcon>}
                            text='Home'
                            to='/'
                            state={position}
                        ></Item>
                        <Item
                            icon={<DataIcon></DataIcon>}
                            text='Data'
                            to='/data'
                            state={position}
                        ></Item>
                        <Item
                            icon={<AnalitycsIcon></AnalitycsIcon>}
                            text='Analitycs'
                            to='/analitycs'
                            state={position}
                        ></Item>
                        <Item
                            icon={<FilterIcon></FilterIcon>}
                            text='Advance filter'
                            to='/filter'
                            state={position}
                        ></Item>
                        <Item
                            icon={<SettingsIcon></SettingsIcon>}
                            text='Settings'
                            to='/settings'
                            state={position}
                        ></Item>                    
                    </List>         
                </Grid>
                <Grid 
                    item
                    container
                    justify='flex-end'
                    className={classes.onTop}
                >
                    <Grid item>
                        <NavbarChangePosition 
                            state={position}
                            onClick={onChangePosition}
                        ></NavbarChangePosition>
                    </Grid>
                </Grid>
            </Grid>
            <Box className={classes.backgroundIconWrapper}>
                <Icon className={classes.backgroundIcon} color='primary'>
                    <SvgIcon>
                        <path fill="currentColor" d="M17,3L22.25,7.5L17,12L22.25,16.5L17,21V18H14.26L11.44,15.18L13.56,13.06L15.5,15H17V12L17,9H15.5L6.5,18H2V15H5.26L14.26,6H17V3M2,6H6.5L9.32,8.82L7.2,10.94L5.26,9H2V6Z" />
                    </SvgIcon>
                </Icon>
            </Box>
        </Box>
    );
}
