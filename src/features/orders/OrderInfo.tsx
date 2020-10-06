import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailTextWrapper from './DetailShortTextWrapper'

export interface OrderInfoProps {
    order_id: number;
    order_date: string;
    required_date: string;
    shipped_date: string;
    manager_name: string;
}

export default function OrderInfo(props: OrderInfoProps) {
    return (
        <Grid 
            container
            spacing={1}
        >
            <DetailTextWrapper title='Order ID'>
                {`${props.order_id}`}
            </DetailTextWrapper>
            <DetailTextWrapper title='Order date'>
                {props.order_date}
            </DetailTextWrapper>
            <DetailTextWrapper title='Required date'>
                {props.required_date}
            </DetailTextWrapper>
            <DetailTextWrapper title='Shipped date'>
                {props.shipped_date}
            </DetailTextWrapper>
            <DetailTextWrapper title='Manager'>
                {props.manager_name}
            </DetailTextWrapper>
        </Grid>
    )
}
