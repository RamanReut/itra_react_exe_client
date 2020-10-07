import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailLongTextWrapper from './DetailLongTextWrapper'
import DetailShortTextWrapper from './DetailShortTextWrapper'
import { makeStyles } from '@material-ui/core/styles'
import { types } from './reducer'
import { discountToString } from './utils'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation('orders');

    return (
        <Grid 
            container
            spacing={1}
            className={classes.root}
        >
            <DetailLongTextWrapper title={t('product.product')}>
                {product}
            </DetailLongTextWrapper>
            <DetailShortTextWrapper title={t('product.brand')}>
                {brand}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title={t('product.model_year')}>
                {model_year.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title={t('product.list_price')}>
                {list_price.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title={t('product.quantity')}>
                {quantity.toString()}
            </DetailShortTextWrapper>
            <DetailShortTextWrapper title={t('product.discount')}>
                {discountToString(discount)}
            </DetailShortTextWrapper>
        </Grid>
    );
}
