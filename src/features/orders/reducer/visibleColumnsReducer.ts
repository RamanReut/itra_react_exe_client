import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit'
import { ROOT_REDUCER_NAME } from './constants'
import { ColumnVisibleState, Columns } from './types'

const initialState: ColumnVisibleState = {
    isOpen: false,
    checkedColumns: [],
}

const slice = createSlice({
    name: `${ROOT_REDUCER_NAME}`,
    initialState: initialState,
    reducers: {
        open(state: ColumnVisibleState, { payload }: PayloadAction<Columns[]>) {
            state.isOpen = true;
            state.checkedColumns = payload;
        },
        close(state: ColumnVisibleState, action: Action) {
            state.isOpen = false;
        },
        toggleCheck(state: ColumnVisibleState, { payload }: PayloadAction<Columns>) {
            const i = state.checkedColumns.indexOf(payload);
            if (i === -1) {
                state.checkedColumns.push(payload);
            } else {
                state.checkedColumns.splice(i, 1);
            }
        },
    },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
