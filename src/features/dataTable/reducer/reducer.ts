import { createSlice, createAsyncThunk, PayloadAction, Action } from '@reduxjs/toolkit'
import * as types from './types'

const initialState: types.DataTableState = {
    visibleColumns: [
        'order_id', 
        'order_status', 
        'order_date',
        'required_date',
        'manager_name',
    ],
    data: new Array<types.Row>(),
    isControlColumnsOpen: false,
    isLoading: false,
}

const fetchData = createAsyncThunk(
    'dataTable/fetchData',
    async () => {
        const response = await fetch('/api/orders');
        if(response.ok) {
            return (await response.json()).orders as Array<types.Row>;
        }
    }
);


const slice = createSlice({
    name: 'dataTable',
    initialState: initialState,
    reducers: {
        setVisibilityColumns(
            state:types.DataTableState,
            { payload }: PayloadAction<Array<types.Columns>>,
        ) {
            state.visibleColumns = payload;
        },

        setIsControlColumnsOpen(
            state: types.DataTableState, 
            { payload }: PayloadAction<boolean>
        ) {
            state.isControlColumnsOpen = payload;
        },

        reset(state: types.DataTableState, action: Action) {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchData.fulfilled, 
            (state: types.DataTableState, { payload }: PayloadAction<any>) => {
                state.data = payload as Array<types.Row>;
                state.isLoading = false;
           });
        builder.addCase(
            fetchData.pending,
            (state: types.DataTableState, action: Action) => {
                state.isLoading = true;
            },
        )
    },
});

export const reducer = slice.reducer;
export const actions = { fetchData, ...slice.actions };
