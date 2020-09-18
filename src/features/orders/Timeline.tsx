import React, { useCallback, useEffect } from 'react'
import { Timeline as TimelineComponent, StepProps } from '../../share/timeline'
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

const DISABLE_COLOR = '#9e9e9e';

const useTimelineStyles = makeStyles((theme: Theme) => ({
    contentWrapper: {
        width: '35em',
        [theme.breakpoints.down('xs')]: {
            width: '10em',
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
                    label: MAP_STATUS_ID_TO_TEXT[1],
                    icon: <LocalShippingIcon></LocalShippingIcon>,
                    content: (
                        <Box className={classes.contentWrapper}>
                            <DetailLongTextWrapper title='Order date'>
                                {order.order_date}
                            </DetailLongTextWrapper>
                        </Box>
                    ),
                    status: status === 1 ? <div></div> : <Done></Done>,
                }, {
                    label: MAP_STATUS_ID_TO_TEXT[2],
                    icon: <SendIcon></SendIcon>,
                    state: (status > 1) ? 'enable' : 'disable',
                    content: (
                        <Box className={classes.contentWrapper}>
                            <DetailLongTextWrapper title='Required date'>
                                {order.required_date}
                            </DetailLongTextWrapper>
                        </Box>
                    ),
                    status: (status > 2) ? <Done></Done> : <div></div>,
                    color: (status > 1) ?
                        theme.palette.primary.main : DISABLE_COLOR,
                },
                lastStepProps(order, theme, classes.contentWrapper),
            ]}
            activeStep={activeStep < 0 ? statusToStep(order.order_status) : activeStep}
            onStepChange={handleStepChange}
        ></TimelineComponent>
    );
}

function statusToStep(status: number): number {
    if (status === 3) {
        return -1;
    } else {
        return (status > 2 ? 3 : status) - 1;
    }
}

function lastStepProps(
    order: types.Record,
    theme: Theme,
    contentWrapper: string,
): StepProps {
    const status = order.order_status;

    if (status === 3) {
        return {
            label: MAP_STATUS_ID_TO_TEXT[3],
            icon: <RejectedIcon></RejectedIcon>,
            state: 'disable',
            color: theme.palette.error.main,
        }
    } else {
        return {
            label: MAP_STATUS_ID_TO_TEXT[4],
            icon: <DoneIcon></DoneIcon>,
            state: status === 4 ? 'enable' : 'disable',
            content: (
                <Box className={contentWrapper}>
                    <DetailLongTextWrapper title='Shipped date'>
                        {order.shipped_date}
                    </DetailLongTextWrapper>
                </Box>
            ),
            status: status > 2 ? <Done></Done> : <div></div>,
            color: status === 4 ? theme.palette.primary.main : DISABLE_COLOR,
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
