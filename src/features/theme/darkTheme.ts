import { createMuiTheme, Theme } from '@material-ui/core/styles'

const MAIN = '#757575';

export function darkTheme(theme: Theme){
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            type: 'dark', 
            primary: {
                main: MAIN,
            },
            secondary: {
                main: MAIN,
            },
            background: {
                paper: '#424242',
            },
            text: {
                primary: 'rgb(255, 255, 255)',
            },
            timeline: {
                main: 'white',
                disable: 'rgb(157, 157, 157)',
            },
            contrastThreshold: 0.3,
        },
        overrides: {
            ...theme.overrides,
            MuiSelect: {
                icon: {
                    color: 'rgb(255, 255, 255)',
                }
            }
        },
    });
}
