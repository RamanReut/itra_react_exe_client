import { basicTheme } from './basicTheme'
import { ThemeOptions } from '@material-ui/core/styles'

const BACKGROUND_DEFAULT = "#f5f5f5";
const MAIN = "rgba(33, 21, 84, 1)";

export const lightTheme: ThemeOptions = {
    ...basicTheme,
    palette: {
            primary: {
                light: "rgba(129, 92, 237, 1)",
                main: MAIN,
            },
            secondary: {
                light: "rgba(129, 92, 237, 1)",
                main: MAIN,
            },
            timeline: {
                main: MAIN,
                disable: "rgb(159, 159, 159)",
            },
            tab: {
                selected: MAIN,
            },
            navbar: {
                active: MAIN,
            },
            type: 'light',
            background: {
                default: BACKGROUND_DEFAULT,
                paper: '#fff',
            },
            tonalOffset: 0.1,
        },
};

