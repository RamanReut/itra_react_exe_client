import { combineReducers } from '@reduxjs/toolkit'
import * as detail from './detailReducer'
import * as ordersTable from './ordersTableReducer'
import * as visibleColumns from './visibleColumnsReducer'

export const reducer = combineReducers({
    detail: detail.reducer,
    ordersTable: ordersTable.reducer,
    visibleColumns: visibleColumns.reducer,
});

export const actions = {
    detail: detail.actions,
    ordersTable: ordersTable.actions,
    visibleColumns: visibleColumns.actions,
}
