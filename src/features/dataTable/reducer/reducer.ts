import { createSlice, createAsyncThunk, PayloadAction, Action } from '@reduxjs/toolkit'
import * as types from './types'
import axios from 'axios'

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
    isLoadingFailed: false,
    checkedColumns: new Array<types.Columns>(),
}

const fetchData = createAsyncThunk(
    'dataTable/fetchData',
    async () => {
        const response = await axios.get('/api/orders');
        return response.data.orders as Array<types.Row>;
    }
);

const slice = createSlice({
    name: 'dataTable',
    initialState: initialState,
    reducers: {
        updateVisibleColumns(
            state:types.DataTableState,
            { payload }: PayloadAction<Array<types.Columns>>,
        ) {
            state.visibleColumns = payload;
        },

        openVisibleColumnsDialog(
            state: types.DataTableState, 
            action: Action,
        ) {
            state.isControlColumnsOpen = true;
        },

        closeVisibleColumnsDialog(
            state: types.DataTableState,
            action: Action,
        ) {
             state.isControlColumnsOpen = false;
        },

        initCheckedColumns(
            state: types.DataTableState,
            action: Action,
        ) {
            state.checkedColumns = state.visibleColumns;
        },

        checkColumns(
            state: types.DataTableState,
            { payload }: PayloadAction<types.Columns>,
        ) { 
            const i = state.checkedColumns.indexOf(payload);
            if( i === -1 ) {
                state.checkedColumns.push(payload);
            } else {
                state.checkedColumns.splice(i, 1);
            }
        },

        applyVisibleColumns(
            state: types.DataTableState,
            action: Action,
        ) {
            state.visibleColumns = state.checkedColumns;
            state.isControlColumnsOpen = false;
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
                state.isLoadingFailed = false;
           }
        );
        builder.addCase(
            fetchData.pending,
            (state: types.DataTableState, action: Action) => {
                state.isLoading = true;
            },
        );
        builder.addCase(
            fetchData.rejected,
            (state: types.DataTableState, action: Action) => {
                state.isLoading = false;
                state.isLoadingFailed = true;
            },
        );
    },
});

export const reducer = slice.reducer;
export const actions = { fetchData, ...slice.actions };
