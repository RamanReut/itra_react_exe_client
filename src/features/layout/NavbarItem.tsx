import React, { ReactElement } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/ListItemIcon'
import Text from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import * as constants from './constants'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: `0.25em 0em`,
        '& svg': {
            margin: 'auto'
        },
    },
    text: {
        marginRight: '1em',
    },
    icon: {
      width: `${constants.NAVBAR_ICON_SIZE}em`,
      overflow: 'hidden',
    },
}));

export interface ItemProps {
    icon: ReactElement,
    text: string,
    to: string,
}

export default function Item({ icon, text, to }: ItemProps) {
    const classes = useStyles();

    return (
        <ListItem 
            classes={{ gutters: classes.root }}
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