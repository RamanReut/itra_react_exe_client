import React, { ReactElement } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import MenuOpen from '@material-ui/icons/MenuOpen'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link } from '@material-ui/core'
import { NavbarPosition } from './Navbar'

const useStylesHiddenButton = makeStyles((theme: Theme) => ({
    iconWrapper: {
        color: theme.palette.primary.contrastText
    }
}));

const useStylesPath = makeStyles((theme: Theme) => ({
    li: {
        color: theme.palette.primary.contrastText
    }, 
    separator: {
        color: theme.palette.grey[500],
    },
}));

interface HideButtonProps {
    state: NavbarPosition,
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

function Path() {
    const classes = useStylesPath();

    return (
        <Breadcrumbs 
            classes={classes}
            maxItems={4}
        >
            {createPathPoints(['main', 'data'])}
        </Breadcrumbs>
    );
}

function createPathPoints(points: string[]): ReactElement[] {
    return points.map((elem: string, key: number) => {
        return <Link color="inherit" key={elem}>{elem}</Link>
    });
}

export interface HeaderProps {
    navbarPosition: NavbarPosition;
    onNavbarButtonClick: () => void;
}

export default function Header({
    navbarPosition,
    onNavbarButtonClick,
}: HeaderProps) {
    return (
        <AppBar>
            <Grid 
                container
                justify='space-between'
                wrap='nowrap'
            >
                <Grid 
                    item 
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
                        <Path></Path>
                    </Grid>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </AppBar>
    );
}