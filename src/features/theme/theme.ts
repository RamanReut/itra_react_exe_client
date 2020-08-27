import { createMuiTheme } from '@material-ui/core/styles'

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
            default: "#f5f5f5",
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
        }
    }
});