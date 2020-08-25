import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import * as types from './types'
import { ROOT_REDUCER_NAME } from './constants'

const initialState = {
    isOpen: false,
    id: 0,
    expandedGroups: ['main' as types.DetailGroup],
    expandedProduct: [],
}

const slice = createSlice({
    name: `${ROOT_REDUCER_NAME}/detail`,
    initialState: initialState,
    reducers: {
        open(state: types.DetailState, { payload }: PayloadAction<number>) {
            state.isOpen = true;
            state.id = payload;
            state.expandedProduct = [];
        },
        close(state: types.DetailState, action: Action) {
            state.isOpen = false;
        },
        reset(state: types.DetailState, action: Action) {
            return initialState;
        },
        toggleExpandGroup(
            state: types.DetailState, 
            { payload }: PayloadAction<types.DetailGroup>,
        ) {
            const i = state.expandedGroups.indexOf(payload);
            if(i > -1) {
                state.expandedGroups.splice(i, 1);
            } else {
                state.expandedGroups.push(payload);
            }
        },
        toggleExpandProduct(
            state: types.DetailState,
            { payload }: PayloadAction<string>,
        ) {
            const i = state.expandedProduct.indexOf(payload);
            if(i > -1) {
                state.expandedProduct.splice(i, 1);
            } else {
                state.expandedProduct.push(payload);
            }
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;