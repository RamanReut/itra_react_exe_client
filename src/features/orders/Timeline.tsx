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
import RejectedIcon from '@material-ui/icons/Close'
import { types } from './reducer'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

const DISABLE_COLOR_OFFSET = 500;

const useDoneStyles = makeStyles((theme: Theme) => ({
    icon: {
        color: theme.palette.success.main,
    },
}));

export default function Timeline() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t } = useTranslation('orders');

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
            actions.timeline.changeActiveStep(
                MAP_ORDER_STATUS_TO_STEP_NAME[status],
            ),
        );
    }, [status, dispatch]);

    return (
        <TimelineComponent
            steps={generateSteps(order, theme, t)}
            activeStep={
                activeStep < 0 ?
                    MAP_ORDER_STATUS_TO_STEP_NAME[status] :
                    activeStep
            }
            onStepChange={handleStepChange}
        ></TimelineComponent>
    );
}

enum StepName {
    Ordered = 0,
    Processing,
    Complete,
    Cancel,
}

interface MapOrderStatusToStepName {
    [index: number]: number;
}

const MAP_ORDER_STATUS_TO_STEP_NAME: MapOrderStatusToStepName = {
    [types.OrderStatus.Ordered]: StepName.Ordered,
    [types.OrderStatus.Processing]: StepName.Processing,
    [types.OrderStatus.Complete]: StepName.Complete,
    [types.OrderStatus.Cancel]: StepName.Cancel,
}

interface MapStepNameToOrderStatus {
    [index: number]: number;
}

const MAP_STEP_NAME_TO_ORDER_STATUS: MapStepNameToOrderStatus = {
    [StepName.Ordered]: types.OrderStatus.Ordered,
    [StepName.Processing]: types.OrderStatus.Processing,
    [StepName.Complete]: types.OrderStatus.Complete,
    [StepName.Cancel]: types.OrderStatus.Cancel,
}

function generateSteps(
    order: types.Record,
    theme: Theme,
    translate: TFunction,
): StepProps[] {
    return [
        createOrderedStep(order, theme, translate),
        createProcessingStep(order, theme, translate),
        lastStepProps(order, theme, translate),
    ]
}

function createOrderedStep(
    order: types.Record,
    theme: Theme,
    translate: TFunction,
): StepProps {
    return createStep(
        {
            step: StepName.Ordered,
            icon: <LocalShippingIcon></LocalShippingIcon>,
            content: (
                <DetailLongTextWrapper title={translate('columns.order_date')}>
                    {order.order_date}
                </DetailLongTextWrapper>
            ),
            state: 'enable',
            statusComponent:
                (order.order_status === types.OrderStatus.Ordered) ?
                    <div></div> : <Done></Done>,
            color:
                theme.palette.type === 'light' ?
                    theme.palette.primary.main :
                    theme.palette.text.primary,
        },
        translate
    );
}

function createProcessingStep(
    order: types.Record,
    theme: Theme,
    translate: TFunction,
): StepProps {
    const status = order.order_status;

    return createStep(
        {
            step: StepName.Processing,
            icon: <SendIcon></SendIcon>,
            state: (status > types.OrderStatus.Processing) ? 'enable' : 'disable',
            content: (
                <DetailLongTextWrapper title={translate('columns.required_date')}>
                    {order.required_date}
                </DetailLongTextWrapper>
            ),
            statusComponent: (status > types.OrderStatus.Processing) ?
                <Done></Done> : <div></div>,
            color: getColor(theme, !(status > types.OrderStatus.Ordered)),
        },
        translate
    );
}

interface CreateStepProps {
    step: StepName;
    icon: React.ReactElement;
    state: 'enable' | 'disable';
    statusComponent: React.ReactElement;
    content: React.ReactElement;
    color: string;
}

function createStep(
    {
        step,
        icon,
        state,
        statusComponent,
        content,
        color,
    }: CreateStepProps,
    translate: TFunction,
): StepProps {
    return {
        label: translate(`status.${MAP_STEP_NAME_TO_ORDER_STATUS[step]}`),
        state: state,
        icon: icon,
        status: statusComponent,
        content: (
            <ContentWrapper>
                {content}
            </ContentWrapper>
        ),
        color: color,
    }
}

function lastStepProps(
    order: types.Record,
    theme: Theme,
    translate: TFunction,
): StepProps {
    const status = order.order_status;

    if (status === types.OrderStatus.Cancel) {
        return {
            label:
                translate(
                    `status.${MAP_STEP_NAME_TO_ORDER_STATUS[StepName.Cancel]}`,
                ),
            icon: <RejectedIcon></RejectedIcon>,
            state: 'disable',
            color: theme.palette.error.main,
        }
    } else {
        return {
            label:
                translate(
                    `status.${MAP_STEP_NAME_TO_ORDER_STATUS[StepName.Complete]}`,
                ),
            icon: <DoneIcon></DoneIcon>,
            state: status === types.OrderStatus.Complete ? 'enable' : 'disable',
            content: (
                <ContentWrapper>
                    <DetailLongTextWrapper
                        title={translate('columns.shipped_date')}
                    >
                        {order.shipped_date}
                    </DetailLongTextWrapper>
                </ContentWrapper>
            ),
            status:
                status > types.OrderStatus.Processing ?
                    <Done></Done> : <div></div>,
            color: getColor(theme, status !== types.OrderStatus.Complete),
        }
    }
}

function getColor(theme: Theme, isDisable: boolean) {
    let color: string;

    if (theme.palette.type === 'light') {
        if (isDisable) {
            color = theme.palette.grey[DISABLE_COLOR_OFFSET];
        } else {
            color = theme.palette.primary.main;
        }
    } else {
        if (isDisable) {
            color = theme.palette.grey[500];
        } else {
            color = theme.palette.text.primary;
        }
    }

    return color;
}

const useContentWrapperStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '35em',
        [theme.breakpoints.down('xs')]: {
            width: '15em',
        },
    },
}));

interface ContentWrapperProps {
    children: React.ReactElement;
}

function ContentWrapper({
    children
}: ContentWrapperProps) {
    const classes = useContentWrapperStyles();

    return (
        <Box className={classes.root}>
            {children}
        </Box>
    );
}

function Done() {
    const classes = useDoneStyles();

    return (
        <Icon className={classes.icon}>
            <DoneIcon></DoneIcon>
        </Icon>
    );
}
