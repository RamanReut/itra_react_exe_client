import React from 'react'
import { types } from './reducer'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import OrderInfo from './OrderInfo'
import { makeStyles, fade, Theme } from '@material-ui/core/styles'
import DetailWrapper from './DetailWrapper'
import CustomerInfo from './CustomerInfo'
import DetailItemsInfo from './DetailItemsInfo'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: '80vw',
        width: '40em',
        backgroundColor: fade(theme.palette.common.black, 0.1),
        minHeight: '100%',
    }
}));

export interface OrderDetailProps {
    isOpen: boolean,
    id: number,
    data: types.DataIndexable,
    onClose: () => void,
    expandedGroups: Array<types.DetailGroup>,
    onToggleExpandGroup: (group: types.DetailGroup) => void,
    expandedProduct: Array<string>,
    onToggleExpandProduct: (product: string) => void,
}

export default function OrderDetail({
    isOpen,
    id,
    data,
    onClose,
    expandedGroups,
    onToggleExpandGroup,
    expandedProduct,
    onToggleExpandProduct,
}: OrderDetailProps) {
    const classes = useStyles();

    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={onClose}
        >
            <Box className={classes.root}>
                <DetailWrapper 
                    title='Order'
                    isExpand={expandedGroups.includes('main')}
                    onChange={() => onToggleExpandGroup('main')}
                >
                    <OrderInfo {...data[id]}></OrderInfo>
                </DetailWrapper>
                <DetailWrapper
                    title='Customer'
                    isExpand={expandedGroups.includes('customer')}
                    onChange={() => onToggleExpandGroup('customer')}
                >
                    <CustomerInfo {...data[id]}></CustomerInfo>                   
                </DetailWrapper>
                <DetailWrapper
                    title='Items'
                    isExpand={expandedGroups.includes('items')}
                    onChange={() => onToggleExpandGroup('items')}
                >
                    <DetailItemsInfo 
                        items={data[id] ? data[id].order_items : []}
                        expandedItems={expandedProduct}
                        onToggleExpandItem={onToggleExpandProduct}
                    ></DetailItemsInfo>
                </DetailWrapper>
            </Box>
        </Drawer>
    );
}