import * as types from './types'
import { createSelector } from '@reduxjs/toolkit'

export function dataTable(state: types.RootState): types.DataTableState {
    return state.dataTable;
}

export const visibleColumns = createSelector(
    dataTable,
    (state) => state.visibleColumns,
);

export const data = createSelector(
    dataTable,
    (state) => state.data
);

export const isControlColumnsOpen = createSelector(
    dataTable,
    (state) => state.isControlColumnsOpen,
);

export const isLoading = createSelector(
    dataTable,
    (state) => state.isLoading,
);

export const isLoadingFailed = createSelector(
    dataTable,
    (state) => state.isLoadingFailed,
);

export const checkedColumns = createSelector(
    dataTable,
    (state) => state.checkedColumns,
);
