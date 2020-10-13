import React from 'react'

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        timeline: {
            main: React.CSSProperties['color'],
            disable: React.CSSProperties['color'],
        },
        tab: {
            selected: React.CSSProperties['color'],
        },
        navbar: {
            active: React.CSSProperties['color'],
        },
    }

    interface PaletteOptions {
        timeline?: {
            main?: React.CSSProperties['color'],
            disable?: React.CSSProperties['color'],
        },
        tab?: {
            selected?: React.CSSProperties['color'],
        },
        navbar?: {
            active?: React.CSSProperties['color'],
        },
    }
}
