import { createMuiTheme } from '@material-ui/core/styles'
import { basicTheme } from './basicTheme'

const BACKGROUND_DEFAULT = "#f5f5f5";

export const lightTheme = createMuiTheme({
    ...basicTheme,
    palette: {
        type: 'light',
        primary: {
            light: "rgba(129, 92, 237, 1)",
            main: "rgba(33, 21, 84, 1)",
        },
        background: {
            default: BACKGROUND_DEFAULT,
            paper: '#fff',
        },
        tonalOffset: 0.1,
    },
});
