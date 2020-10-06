import { createMuiTheme } from '@material-ui/core/styles'

const BACKGROUND_DEFAULT = "#f5f5f5";

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: "rgba(129, 92, 237, 1)",
            main: "rgba(33, 21, 84, 1)",
            dark: "rgba(33, 21, 84, 1)",
            contrastText: "#fff",
        },
        background: {
            paper: "#fff",
            default: BACKGROUND_DEFAULT,
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
               boxShadow: 'none',
            }
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: '2em',
            },
        },
    }
});
