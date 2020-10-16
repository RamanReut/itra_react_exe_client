import React from 'react'
import { MTableFilterRow } from 'material-table'
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles'

function theme(theme: Theme) {
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            secondary: {
                main: theme.palette.table.filterColor as string,
            },
        },
    })
}

export default function RowFilter(props: any) {
    return (
        <ThemeProvider theme={theme}>
            <MTableFilterRow {...props}></MTableFilterRow>
        </ThemeProvider>
    );
}
