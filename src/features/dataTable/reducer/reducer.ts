import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as types from './types'
import { Action } from 'material-table';

const initialState: types.DataTableState = {
    visibleColumns: [
        'order_id', 
        'order_status', 
        'order_date',
        'required_date',
        'manager_name',
    ],
    data: new Array<types.Row>(),
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
        toggleVisibility(state: types.DataTableState, { payload }: PayloadAction<types.Columns>) {
            const index = state.visibleColumns.indexOf(payload);

            if (index === -1) {
                state.visibleColumns.push(payload);
            } else {
                state.visibleColumns.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(
            fetchData.fulfilled, 
            (state: types.DataTableState, { payload }: PayloadAction<any>) => {
                state.data = payload as Array<types.Row>;
           });
    },
});

export const reducer = slice.reducer;
export const actions = { fetchData, ...slice.actions };