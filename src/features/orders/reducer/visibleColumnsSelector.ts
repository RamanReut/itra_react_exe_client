import { createSelector } from '@reduxjs/toolkit'
import { visibleColumns } from './rootSelector'

export const isOpen = createSelector(
    visibleColumns,
    (state) => state.isOpen
);

export const checkedColumns = createSelector(
    visibleColumns,
    (state) => state.checkedColumns,
);
