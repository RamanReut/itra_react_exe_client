import { combineReducers } from '@reduxjs/toolkit'
import * as detail from './detailReducer'
import * as ordersTable from './ordersTableReducer'
import * as visibleColumns from './visibleColumnsReducer'
import * as timeline from './timelineReducer'
import * as filters from './filters'

export const reducer = combineReducers({
    detail: detail.reducer,
    ordersTable: ordersTable.reducer,
    visibleColumns: visibleColumns.reducer,
    timeline: timeline.reducer,
    filters: filters.reducer,
});

export const actions = {
    detail: detail.actions,
    ordersTable: ordersTable.actions,
    visibleColumns: visibleColumns.actions,
    timeline: timeline.actions,
    filters: filters.actions,
}
