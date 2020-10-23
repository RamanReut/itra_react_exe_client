import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailTextWrapper from './DetailShortTextWrapper'
import { useTranslation } from 'react-i18next'

export interface OrderInfoProps {
    order_id: number;
    order_date: string;
    required_date: string;
    shipped_date: string;
    manager_name: string;
}

export default function OrderInfo(props: OrderInfoProps) {
    const { t } = useTranslation('orders');

    return (
        <Grid 
            container
            spacing={1}
        >
            <DetailTextWrapper title={t('columns.order_id')}>
                {`${props.order_id}`}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.order_date')}>
                {props.order_date}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.required_date')}>
                {props.required_date}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.shipped_date')}>
                {props.shipped_date}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.manager_name')}>
                {props.manager_name}
            </DetailTextWrapper>
        </Grid>
    )
}
