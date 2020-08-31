import React from 'react'
import { types } from './reducer'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import { makeStyles, fade, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import OrderIcon from '@material-ui/icons/ShoppingCart'
import OrderTabPanel from './OrderTabPanel'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: '80vw',
        width: '40em',
        backgroundColor: fade(theme.palette.common.black, 0.1),
        minHeight: '100%',
    },
    detailIdWrapper: {
        marginLeft: '1em',
    },
}));

export interface OrderDetailProps {
    isOpen: boolean;
    id: number;
    data: types.DataIndexable;
    onClose: () => void;
    tab: number;
    onChangeTab: (id: number) => void;
}

export default function OrderDetail({
    isOpen,
    id,
    data,
    onClose,
    tab,
    onChangeTab,
}: OrderDetailProps) {
    const classes = useStyles();

    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={onClose}
        >
            <Box className={classes.root}>
                <Grid 
                    container
                    direction='column'
                    spacing={2}
                >
                    <Grid 
                        item
                        container
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item>
                            <Grid 
                                container
                                alignItems='center'
                                spacing={2}
                                className={classes.detailIdWrapper}
                            >
                                <Grid item>
                                    <Icon color='primary'>
                                        <OrderIcon></OrderIcon>
                                    </Icon>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5' color='primary'>
                                        {id}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={onClose}>
                                <CloseIcon></CloseIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <OrderTabPanel
                            tab={tab}
                            onChangeTab={onChangeTab}
                            data={data[id]}
                        ></OrderTabPanel>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
}
