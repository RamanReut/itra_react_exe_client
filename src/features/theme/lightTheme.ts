import { createMuiTheme, Theme } from '@material-ui/core/styles'

const BACKGROUND_DEFAULT = "#f5f5f5";

export function lightTheme(theme: Theme) {
    return createMuiTheme({
        ...theme,
        palette: {
            ...theme.palette,
            type: 'light',
            background: {
                default: BACKGROUND_DEFAULT,
                paper: '#fff',
            },
            tonalOffset: 0.1,
        },
    });
}
