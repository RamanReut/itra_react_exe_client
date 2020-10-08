import { createMuiTheme } from '@material-ui/core/styles'

export const basicTheme = createMuiTheme({
    palette: {
        primary: {
            light: "rgba(129, 92, 237, 1)",
            main: "rgba(33, 21, 84, 1)",
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
