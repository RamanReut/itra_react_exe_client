import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ROOT_REDUCER_NAME } from './constants'
import { TimelineState } from './types'

const initialState = {
    activeStep: -1,
};

const slice = createSlice({
    name: `${ROOT_REDUCER_NAME}/timeline`,
    initialState: initialState,
    reducers: {
        changeActiveStep(state: TimelineState, { payload }: PayloadAction<number>) {
            state.activeStep = payload;
        },
    },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
