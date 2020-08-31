import React from 'react'
import Box from '@material-ui/core/Box'

export interface TabPanelProps {
    value: number,
    index: number,
    children: React.ReactElement,
}

export default function TabPanel({
    value,
    index,
    children,
}: TabPanelProps ) {
    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
        >
            {children}
        </Box>
    );
}
