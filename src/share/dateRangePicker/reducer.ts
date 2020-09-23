import {
    createSlice,
    Action,
    createSelector
} from '@reduxjs/toolkit'

export interface DateRangePickerState {
    isOpen: boolean;
}

const INITIAL_STATE: DateRangePickerState = {
    isOpen: false,
}

export function createReducer(
    name: string,
    rootSelector: (state: any) => DateRangePickerState,
) {
    const slice = createSlice({
        name: name,
        initialState: INITIAL_STATE,
        reducers: {
            open(
                state: DateRangePickerState,
                action: Action,
            ) {
                state.isOpen = true;
            },
            close(
                state: DateRangePickerState,
                action: Action,
            ) {
                state.isOpen = false;
            },
        },
    });

    const isOpenSelector = createSelector(
        rootSelector,
        (state) => state.isOpen,
    );

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        selectors: {
            isOpen: isOpenSelector,
        }
    }
}
