import React from 'react'
import Grid from '@material-ui/core/Grid'
import DetailTextWrapper from './DetailLongTextWrapper'
import { useTranslation } from 'react-i18next'

export interface CustomerInfoProps {
    customer_name: string;
    email: string;
    address: string;
}

export default function CustomerInfo(props: CustomerInfoProps) {
    const { t } = useTranslation('orders');

    return (
        <Grid 
            container
            spacing={1}
        >
            <DetailTextWrapper title={t('columns.customer_name')}>
                {props.customer_name}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.email')}>
                {props.email}
            </DetailTextWrapper>
            <DetailTextWrapper title={t('columns.address')}>
                {props.address}
            </DetailTextWrapper>
        </Grid>
    );
}
