import React, { useMemo } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import TabPanel from './TabPanel'
import OrderInfo from './OrderInfo'
import CustomerInfo from './CustomerInfo'
import ItemsInfo from './DetailItems'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Timeline from './Timeline'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: '0 1em',
    },
    panelWrapper: {
        boxShadow: theme.shadows[4],
        padding: '1em',
        backgroundColor: theme.palette.common.white,
        borderRadius: '1em',
        borderColor: theme.palette.background.default,
        borderWidth: '5px',
        borderStyle: 'solid',
    },
    indicator: {
        backgroundColor: 'transparent',
    },
    tabs: {
        position: 'relative',
        top: '5px',
        width: '95%',
        margin: 'auto',
    },
    tab: {
        backgroundColor: theme.palette.common.white,
        borderTopRightRadius: '1em',
        borderTopLeftRadius: '1em',
        borderBottomWidth: '5px',
        borderBottomColor: theme.palette.background.default,
        borderBottomStyle: 'solid',
        zIndex: 1,
    },
    tabSelected: {
        borderColor: theme.palette.background.default,
        borderWidth: '5px',
        borderStyle: 'solid',
        borderBottomWidth: '0',
        zIndex: 2,
        boxShadow: theme.shadows[4],
    },
}));

export interface OrderTabPanelProps {
    tab: number;
    onChangeTab: (id: number) => void;
    data: types.Record,
}

export default function OrderTabPanel({
    tab,
    onChangeTab,
    data,
}: OrderTabPanelProps ) {
    const classes = useStyles();
    const defaultTabProps = {
        classes: {
            root: classes.tab,
            selected: classes.tabSelected,
        },
        disableRipple: true,
    };

    return (
        <Box className={classes.root}>
            <Tabs 
                classes={{ indicator: classes.indicator, root: classes.tabs }}
                value={tab} 
                onChange={(event, value) => onChangeTab(value as number)}
                textColor='primary'
                variant='scrollable'
            >
                <Tab 
                    {...defaultTabProps}
                    label='Order'
                ></Tab> 
                <Tab 
                    {...defaultTabProps}
                    label='Customer'
                ></Tab>
                <Tab 
                    {...defaultTabProps}
                    label='Items'
                ></Tab>
                <Tab
                    {...defaultTabProps}
                    label='Timeline'
                ></Tab>
            </Tabs>
            <Box className={classes.panelWrapper}>
                <TabPanel value={tab} index={0}>
                    <OrderInfo {...data}></OrderInfo>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <CustomerInfo {...data}></CustomerInfo>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <ItemsInfo items={data.order_items}></ItemsInfo>
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <Timeline></Timeline>
                </TabPanel>
            </Box>
        </Box>
    );
}
