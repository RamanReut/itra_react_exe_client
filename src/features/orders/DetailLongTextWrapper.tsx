import React from 'react'
import Grid from '@material-ui/core/Grid'
import TitleWrapper from './TitleWrapper'

export interface DetailLongTextWrapperProps {
    title: string;
    children: string;
}

export default function DeatilLongTextWrapper({
    title,
    children,
}: DetailLongTextWrapperProps ) {
    return (
        <Grid 
            item
            xs={12}
        >
            <Grid container>
                <Grid 
                    item
                    xs={4}
                    sm={2}
                >
                    <TitleWrapper>
                        {title}
                    </TitleWrapper>
                </Grid>
                <Grid 
                    item
                    xs={8}
                    sm={10}
                >
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
}
