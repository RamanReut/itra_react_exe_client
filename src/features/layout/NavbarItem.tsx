import React, { ReactElement } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/ListItemIcon'
import Text from '@material-ui/core/ListItemText'
import { NavLink, LinkProps  } from 'react-router-dom'
import * as constants from './constants'
import { types } from './reducer'
import classnames from 'classnames'
import { Omit } from '@material-ui/types'

const useStyles = makeStyles((theme: Theme) => ({
        gutters: {
            padding: `0.65em 0em`,
        },
        active: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.navbar.active,
                '& svg': {
                    color: theme.palette.navbar.active,
                },
        },
        root: {
            marginLeft: '0.5em',
            borderRadius: '3em 0 0 3em',
            overflow: 'hidden',
            '& svg': {
                margin: 'auto',
            },
            '&:hover': {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.navbar.active,
                '& svg': {
                    color: theme.palette.navbar.active,
                },
            },
        },
        text: {
            marginRight: '1em',
            marginLeft: '0.5em',
            '& span': {
                overflow: 'hidden',
                textOverflow: 'clip',
                whiteSpace: 'nowrap',
            },
        },
        icon: {
          width: `${constants.NAVBAR_ICON_SIZE}em`,
          overflow: 'hidden',
          color: theme.palette.primary.contrastText,
        },
        collapseText: {
            maxWidth: '0',
            marginLeft: '0',
            marginRight: '0',
            overflow: 'hidden',
        },
        collapseItem: {
            width: `${constants.NAVBAR_ICON_SIZE+0.5}em`,
            borderRadius: '3em',
            marginRight: '0.5em',
        },
    }
));

export interface ItemProps {
    icon: ReactElement,
    text: string,
    to: string,
    state: types.NavbarPosition,
}

export default function Item({ icon, text, to, state }: ItemProps) {
    const classes = useStyles();
    const Link = 
        React.forwardRef<any, Omit<LinkProps, 'to'>>((props, ref) => (
            <NavLink 
                activeClassName={classes.active} 
                exact 
                to={to}
                {...props}
                ref={ref}
            ></NavLink>
        ));

    return (
        <ListItem 
            classes={{ 
                gutters: classes.gutters, 
                root: classnames(classes.root, { [classes.collapseItem]: state === 'hide'}) ,
            }}
            button
            component={Link}
        >
            <Icon className={classes.icon}>
                {icon}
            </Icon>
            <Text 
                className={classnames(classes.text, { [classes.collapseText]: state === 'hide'})}
            >
                {text}
            </Text>
        </ListItem>
    );
}
