import { createMuiTheme, Theme } from '@material-ui/core/styles'

export function darkTheme(theme: Theme){
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            type: 'dark', 
            primary: {
                main: '#757575',
            },
            background: {
                paper: '#424242',
            },
            text: {
                primary: 'rgb(255, 255, 255)',
            },
            contrastThreshold: 0.3,
        },
    });
}
