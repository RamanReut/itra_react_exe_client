import React from 'react'
import Box from '@material-ui/core/Box'
import Language from './Language'
import Theme from './Theme'

export default function Settings() {
    return (
        <Box>
            <Language></Language>
            <Theme></Theme>
        </Box>
    );
}
