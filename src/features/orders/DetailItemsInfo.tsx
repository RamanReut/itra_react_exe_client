import React from 'react'
import { types } from './reducer'
import Box from '@material-ui/core/Box'
import DetailWrapper from './DetailWrapper'
import { makeStyles } from '@material-ui/core/styles'
import DetailShortTextWrapper from './DetailShortTextWrapper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    root: {
        width: '100%',
    }
})

export interface DetailItemsInfoProps {
    items: Array<types.OrderItem>;
    expandedItems: Array<string>;
    onToggleExpandItem: (product: string) => void;
}

export default function DetailItemsInfo({
    items,
    expandedItems,
    onToggleExpandItem,
}: DetailItemsInfoProps ) {
    const classes = useStyles();

    return(
        <Box className={classes.root}>
            {items.map((product: types.OrderItem) => {
                return (
                    <DetailWrapper 
                        key={product.product}
                        title={product.product}
                        isExpand={expandedItems.includes    (product.product)}
                        onChange={() => onToggleExpandItem(product.product)}
                        variant='second'
                    >
                        <Grid 
                            container
                            spacing={1}
                        >
                            <DetailShortTextWrapper title='Name'>
                                {product.product}
                            </DetailShortTextWrapper>
                            <DetailShortTextWrapper title='Brand'>
                                {product.brand}
                            </DetailShortTextWrapper>
                            <DetailShortTextWrapper title='Model year'>
                                {`${product.model_year}`}
                            </DetailShortTextWrapper>
                            <DetailShortTextWrapper title='Quantity'>
                                {`${product.quantity}`}
                            </DetailShortTextWrapper>
                            <DetailShortTextWrapper title='Discount'>
                                {`${Math.round((product.discount * 100)).toString()}%`}
                            </DetailShortTextWrapper>
                        </Grid>             
                    </DetailWrapper>
                );
            })}
        </Box>
    );
}