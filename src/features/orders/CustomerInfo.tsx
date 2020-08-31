import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailTextWrapper from './DetailLongTextWrapper'

export interface CustomerInfoProps {
    customer_name: string;
    email: string;
    address: string;
}

export default function CustomerInfo(props: CustomerInfoProps) {
    return (
        <Grid 
            container
            spacing={1}
        >
            <DetailTextWrapper title='Name'>
                {props.customer_name}
            </DetailTextWrapper>
            <DetailTextWrapper title='Email'>
                {props.email}
            </DetailTextWrapper>
            <DetailTextWrapper title='Address'>
                {props.address}
            </DetailTextWrapper>
        </Grid>
    );
}
