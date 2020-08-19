import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { HeaderState } from './types'

const initialState: HeaderState = {
    searchText: '',
}

const slice = createSlice({
    name: 'layout/header',
    initialState: initialState,
    reducers: {
        setSearchText(state: HeaderState, { payload }: PayloadAction<string>) {
            state.searchText = payload;
        }, 
        reset(state: HeaderState, action: Action) {
            return initialState;
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;