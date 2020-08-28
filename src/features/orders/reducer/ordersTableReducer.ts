import { createSlice, createAsyncThunk, PayloadAction, Action } from '@reduxjs/toolkit'
import * as types from './types'
import { ROOT_REDUCER_NAME } from './constants'

const REDUCER_NAME = `${ROOT_REDUCER_NAME}/ordersTable`

const initialState: types.OrdersTableState = {
    visibleColumns: [
        'order_id', 
        'order_status', 
        'order_date',
        'required_date',
        'manager_name',
    ],
    data: {},
}

const fetchData = createAsyncThunk(
    `${REDUCER_NAME}/fetchData`,
    async () => {
        const response = await fetch('/api/orders');
        if(response.ok) {
            return (await response.json()).orders as Array<types.Row>;
        }
    }
);

const slice = createSlice({
    name: REDUCER_NAME,
    initialState: initialState,
    reducers: {
        toggleVisibility(state: types.OrdersTableState, { payload }: PayloadAction<types.Columns>) {
            const index = state.visibleColumns.indexOf(payload);

            if (index === -1) {
                state.visibleColumns.push(payload);
            } else {
                state.visibleColumns.splice(index, 1);
            }
        },
        reset(state: types.OrdersTableState, action: Action) {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchData.fulfilled, 
            (state: types.OrdersTableState, { payload }: PayloadAction<any>) => {
                (payload as Array<types.Record>).forEach((elem) => {
                    state.data[elem.order_id] = elem;
                });
           });
    },
});

export const reducer = slice.reducer;
export const actions = { fetchData, ...slice.actions };
