import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit'
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
        },
        setPosition(
            state: NavbarState, 
            { payload }: PayloadAction<NavbarPosition>
        ): void {
            state.position = payload;
        },
        reset(state: NavbarState, action: Action) {
            return initialState;
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;