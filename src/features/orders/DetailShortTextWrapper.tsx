import React from 'react'
import Grid from '@material-ui/core/Grid'
import TitleWrapper from './TitleWrapper'

export interface TextWrapperProps {
    title: string;
    children: string;
}

export default function TextWrapper({
    title,
    children,
}: TextWrapperProps) {
    return (
        <Grid 
            item
            xs={12}
            sm={6}
        >
            <Grid container>
                <Grid 
                    item
                    xs={4}
                >
                    <TitleWrapper>
                        {title}
                    </TitleWrapper>
                </Grid>
                <Grid
                    item
                    xs={8}
                >
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
}