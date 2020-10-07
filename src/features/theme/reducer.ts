import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeName, RootState } from './types'

const fromLocalStorage = localStorage.getItem('theme');
const initialState: ThemeName =
    fromLocalStorage ? fromLocalStorage as ThemeName : 'light';

const slice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        changeTheme(state: ThemeName, { payload }: PayloadAction<ThemeName>) {
            return payload;
        },
    }
});

export const themeSelector = (state: RootState) => state.theme;

export const reducer = slice.reducer;
export const actions = slice.actions;
