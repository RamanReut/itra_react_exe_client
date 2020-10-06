import { Color } from './types'
import { Theme } from '@material-ui/core/styles'

export function colorPicker(theme: Theme, color: Color): string {
    switch (color) {
        case 'primary':
            return theme.palette.primary.main;
        case 'secondary':
            return theme.palette.secondary.main;
        default:
            return color as string;
    }
}
