import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailLongTextWrapper from './DetailLongTextWrapper'
import DetailShortTextWrapper from './DetailShortTextWrapper'
import { makeStyles } from '@material-ui/core/styles'
import { types } from './reducer'
import { discountToString } from './utils'

const useStyles = makeStyles({
    root: {
        margin: '0.5em 0',
    },
});

export default function DetailItemInfo({
    product,
    brand,
    model_year,
    list_price,
    quantity,
    discount
}: types.OrderItem ) {
    const classes = useStyles();

    return (
        <Grid 
            container
            spacing={1}
            className={classes.root}
        >
            <DetailLongTextWrapper title='Product'>
                {product}
            </DetailLongTextWrapper>
            <DetailShortTextWrapper title='Brand'>
                {brand}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title='Model year'>
                {model_year.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title='List price'>
                {list_price.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title='Quantity'>
                {quantity.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title='Discount'>
                {discountToString(discount)}
            </DetailShortTextWrapper>
        </Grid>
    );
}
