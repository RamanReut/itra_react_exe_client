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
    data: new Array<types.Record>(),
    isControlColumnsOpen: false,
    isLoading: false,
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
        setVisibilityColumns(
            state:types.OrdersTableState,
            { payload }: PayloadAction<Array<types.Columns>>,
        ) {
            state.visibleColumns = payload;
        },

        setIsControlColumnsOpen(
            state: types.OrdersTableState, 
            { payload }: PayloadAction<boolean>
        ) {
            state.isControlColumnsOpen = payload;
        },
        reset(state: types.OrdersTableState, action: Action) {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchData.fulfilled, 
            (state: types.OrdersTableState, { payload }: PayloadAction<any>) => {
                const data: types.DataIndexable = {};
                (payload as Array<types.Record>).forEach((record) => {
                    data[record.order_id] = record;
                });
                state.data = data;
                state.isLoading = false;
           });
        builder.addCase(
            fetchData.pending,
            (state: types.OrdersTableState, action: Action) => {
                state.isLoading = true;
            },
        )
    },
});

export const reducer = slice.reducer;
export const actions = { fetchData, ...slice.actions };
