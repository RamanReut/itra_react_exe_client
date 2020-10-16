import { basicTheme } from './basicTheme'
import { ThemeOptions } from '@material-ui/core/styles'

const MAIN = '#757575';

export const darkTheme: ThemeOptions = {
    ...basicTheme,
    palette: {
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
            tab: {
                selected: 'white',
            },
            navbar: {
                active: 'white',
            },
            contrastThreshold: 0.3,
        },
        overrides: {
            ...basicTheme.overrides,
            MuiSelect: {
                icon: {
                    color: 'rgb(255, 255, 255)',
                }
            }
        },
};

