import { createMuiTheme } from '@material-ui/core/styles'

export function createThemeWithInitialWidth(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    return createMuiTheme({
        props: {
            MuiWithWidth: {
                initialWidth: width,
            }
        }
    })
};