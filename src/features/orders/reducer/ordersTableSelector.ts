import { createSelector } from '@reduxjs/toolkit'
import { ordersTable } from './rootSelector'

export const visibleColumns = createSelector(
    ordersTable,
    (state) => state.visibleColumns,
);

export const data = createSelector(
    ordersTable,
    (state) => state.data
);

export const isControlColumnsOpen = createSelector(
    ordersTable,
    (state) => state.isControlColumnsOpen,
);

export const isLoading = createSelector(
    ordersTable,
    (state) => state.isLoading,
);

export const isLoadingFailed = createSelector(
    ordersTable,
    (state) => state.isLoadingFailed,
);

export const checkedColumns = createSelector(
    ordersTable,
    (state) => state.checkedColumns,
);
