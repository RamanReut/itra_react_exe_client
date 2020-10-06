import { createSelector } from '@reduxjs/toolkit'
import { detail, ordersTable } from './rootSelector'

export const isOpen = createSelector(
    detail, 
    (state) => state.isOpen,
);

export const id = createSelector(
    detail, 
    (state) => state.id,
);

export const tab = createSelector(
    detail, 
    (state) => state.tab,
);

export const currentOrder = createSelector(
    detail,
    ordersTable,
    (detail, orders) => orders.data[detail.id],
);
