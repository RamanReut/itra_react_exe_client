import { createMuiTheme, Theme } from '@material-ui/core/styles'

export function darkTheme(theme: Theme){
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            type: 'dark',  
            background: {
                paper: '#424242',
            },
        }
    });
}
