import { createMuiTheme } from '@material-ui/core/styles'
import { basicTheme } from './basicTheme'

export const darkTheme = createMuiTheme({
    ...basicTheme,
    palette: {
        type: 'dark',
    }
})
