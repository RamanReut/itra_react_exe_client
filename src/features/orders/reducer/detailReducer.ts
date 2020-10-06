import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import * as types from './types'
import { ROOT_REDUCER_NAME } from './constants'

const initialState = {
    isOpen: false,
    id: 0,
    tab: 0,
}

const slice = createSlice({
    name: `${ROOT_REDUCER_NAME}/detail`,
    initialState: initialState,
    reducers: {
        open(state: types.DetailState, { payload }: PayloadAction<number>) {
            state.isOpen = true;
            state.id = payload;
        },
        close(state: types.DetailState, action: Action) {
            state.isOpen = false;
        },
        reset(state: types.DetailState, action: Action) {
            return initialState;
        },
        changeTab(state: types.DetailState, { payload }: PayloadAction<number>) {
            state.tab = payload;
        },
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
