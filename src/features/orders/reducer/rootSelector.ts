import * as types from './types'
import { createSelector } from '@reduxjs/toolkit'

export function root(state: types.RootState) {
    return state.orders;
}

export const ordersTable = createSelector(
    root,
    (state) => state.ordersTable,
);

export const detail = createSelector(
    root,
    (state) => state.detail,
);

export const visibleColumns = createSelector(
    root,
    (state) => state.visibleColumns,
);
