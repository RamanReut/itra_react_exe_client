import { createMuiTheme } from '@material-ui/core/styles'
import { basicTheme } from './basicTheme'

export const darkTheme = createMuiTheme({
    ...basicTheme,
    palette: {
        type: 'dark',
        primary: {
            light: "rgba(129, 92, 237, 1)",
            main: "rgba(33, 21, 84, 1)",
        },
    }
})
