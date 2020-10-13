import { createMuiTheme, Theme } from '@material-ui/core/styles'

const BACKGROUND_DEFAULT = "#f5f5f5";
const MAIN = "rgba(33, 21, 84, 1)";

export function lightTheme(theme: Theme) {
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
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
            type: 'light',
            background: {
                default: BACKGROUND_DEFAULT,
                paper: '#fff',
            },
            tonalOffset: 0.1,
        },
    });
}
