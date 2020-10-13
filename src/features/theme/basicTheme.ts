import { createMuiTheme } from '@material-ui/core/styles'

export const basicTheme = createMuiTheme({
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
