import React, { useCallback, useEffect } from 'react'
import {
    Timeline as TimelineComponent,
    StepProps,
} from '../../share/timeline'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import SendIcon from '@material-ui/icons/Send'
import Icon from '@material-ui/core/Icon'
import DoneIcon from '@material-ui/icons/Done'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from './reducer'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import DetailLongTextWrapper from './DetailLongTextWrapper'
import Box from '@material-ui/core/Box'
import { MAP_STATUS_ID_TO_TEXT } from './constants'
import RejectedIcon from '@material-ui/icons/Close'
import { types } from './reducer'

const DISABLE_COLOR_OFFSET = 500;

const useTimelineStyles = makeStyles((theme: Theme) => ({
    contentWrapper: {
        width: '35em',
        [theme.breakpoints.down('xs')]: {
            width: '15em',
        },
    },
}));

const useDoneStyles = makeStyles({
    icon: {
        color: '#0cb500',
    },
});

export default function Timeline() {
    const classes = useTimelineStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const activeStep = useSelector(selectors.timeline.activeStep);
    const orderId = useSelector(selectors.detail.id);
    const order = useSelector(selectors.ordersTable.data)[orderId];
    const status = order.order_status;

    const handleStepChange = useCallback(
        (id: number) => {
            dispatch(actions.timeline.changeActiveStep(id));
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(
            actions.timeline.changeActiveStep(statusToStep(order.order_status)),
        );
    }, [order, dispatch]);

    return (
        <TimelineComponent
            steps={[
                {
                    label: MAP_STATUS_ID_TO_TEXT[types.OrderStatus.Ordered],
                    icon: <LocalShippingIcon></LocalShippingIcon>,
                    content: (
                        <Box className={classes.contentWrapper}>
                            <DetailLongTextWrapper title='Order date'>
                                {order.order_date}
                            </DetailLongTextWrapper>
                        </Box>
                    ),
                    status: 
                        status === types.OrderStatus.Ordered ? 
                            <div></div> : <Done></Done>,
                }, {
                    label: MAP_STATUS_ID_TO_TEXT[types.OrderStatus.Processing],
                    icon: <SendIcon></SendIcon>,
                    state: (status > types.OrderStatus.Ordered) ? 'enable' : 'disable',
                    content: (
                        <Box className={classes.contentWrapper}>
                            <DetailLongTextWrapper title='Required date'>
                                {order.required_date}
                            </DetailLongTextWrapper>
                        </Box>
                    ),
                    status: 
                        (status > types.OrderStatus.Processing) ? 
                            <Done></Done> : <div></div>,
                    color: (status > types.OrderStatus.Ordered) ?
                        theme.palette.primary.main :
                        theme.palette.grey[DISABLE_COLOR_OFFSET],
                },
                lastStepProps(order, theme, classes.contentWrapper),
            ]}
            activeStep={
                activeStep < 0 ?
                    statusToStep(order.order_status) : activeStep
            }
            onStepChange={handleStepChange}
        ></TimelineComponent>
    );
}

function statusToStep(status: number): number {
    switch (status) {
        case types.OrderStatus.Ordered:
            return 0;
        case types.OrderStatus.Processing:
            return 1;
        case types.OrderStatus.Complete:
            return 2;
        default: 
            return -1;
    }
}

function lastStepProps(
    order: types.Record,
    theme: Theme,
    contentWrapper: string,
): StepProps {
    const status = order.order_status;

    if (status === types.OrderStatus.Cancel) {
        return {
            label: MAP_STATUS_ID_TO_TEXT[types.OrderStatus.Cancel],
            icon: <RejectedIcon></RejectedIcon>,
            state: 'disable',
            color: theme.palette.error.main,
        }
    } else {
        return {
            label: MAP_STATUS_ID_TO_TEXT[types.OrderStatus.Complete],
            icon: <DoneIcon></DoneIcon>,
            state: status === types.OrderStatus.Complete ? 'enable' : 'disable',
            content: (
                <Box className={contentWrapper}>
                    <DetailLongTextWrapper title='Shipped date'>
                        {order.shipped_date}
                    </DetailLongTextWrapper>
                </Box>
            ),
            status:
                status > types.OrderStatus.Processing ?
                    <Done></Done> : <div></div>,
            color: status === types.OrderStatus.Complete ?
                theme.palette.primary.main :
                theme.palette.grey[DISABLE_COLOR_OFFSET],
        }
    }
}

function Done() {
    const classes = useDoneStyles();

    return (
        <Icon className={classes.icon}>
            <DoneIcon></DoneIcon>
        </Icon>
    );
}
