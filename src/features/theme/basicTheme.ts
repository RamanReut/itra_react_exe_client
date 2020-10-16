import { ThemeOptions } from '@material-ui/core/styles'

export const basicTheme: ThemeOptions = {
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
};
