import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function TitleWrapper({ children }: { children: string }) {
    return (
        <Typography variant='subtitle2'>
            {children}
        </Typography>
    );
}