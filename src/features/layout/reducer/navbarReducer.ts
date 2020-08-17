import { createSlice, Action } from '@reduxjs/toolkit'
import { NavbarState, NavbarPosition } from './types'

const initialState: NavbarState = {
    position: 'open' as NavbarPosition,
}

const slice = createSlice({
    name: 'layout/navbar',
    initialState: initialState,
    reducers: {
        togglePosition(state: NavbarState, action: Action): void {
            state.position = state.position === 'open' ? 'hide' : 'open';
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;